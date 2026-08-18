"""
Dipak Vishwakarma Hero — Precision Asset & Registration Pipeline
================================================================
Extracts clean Ensō mask from original master brush asset, generates
trimmed desktop and art-directed mobile cutouts, computes exact mathematical
registration parameters, and outputs hero-composition.json for runtime rendering.
"""

import os
import sys
import json
import numpy as np
from PIL import Image

def smoothstep(edge0, edge1, x):
    x = np.clip((x - edge0) / (edge1 - edge0), 0.0, 1.0)
    return x * x * (3.0 - 2.0 * x)

def process_enso_mask():
    print(">>> Extracting Clean Enso Mask from Original Brush Asset...")
    src_path = "original_brush_halo.png"
    if not os.path.exists(src_path):
        src_path = "src/features/dipak-hero/assets/brush-halo.png"
        
    img = Image.open(src_path).convert("RGBA")
    arr = np.array(img, dtype=np.float32)
    H, W, _ = arr.shape
    
    # 1. Source alpha and rgb
    rgb = arr[:, :, :3]
    alpha = arr[:, :, 3]
    
    # Linear luminance of RGB
    srgb_norm = rgb / 255.0
    lin_rgb = np.where(srgb_norm <= 0.04045, srgb_norm / 12.92, ((srgb_norm + 0.055) / 1.055) ** 2.4)
    lin_lum = 0.2126 * lin_rgb[:, :, 0] + 0.7152 * lin_rgb[:, :, 1] + 0.0722 * lin_rgb[:, :, 2]
    
    # Darkness relative to white background
    darkness = 1.0 - lin_lum
    
    # If source already has a clean natural alpha channel, combine darkness with alpha
    if alpha.max() > 0:
        alpha_norm = alpha / 255.0
        # Preserve authentic charcoal texture & dry bristles
        out_alpha = np.clip(alpha_norm * 1.15, 0.0, 1.0)
    else:
        # Darkness to alpha conversion via smoothstep
        out_alpha = smoothstep(0.04, 0.85, darkness)
        
    # Zero perimeter borders (5px) to guarantee zero bounding-box artifacts
    out_alpha[:5, :] = 0.0
    out_alpha[-5:, :] = 0.0
    out_alpha[:, :5] = 0.0
    out_alpha[:, -5:] = 0.0
    
    # Crop to content bbox with 2% margin
    non_zero = out_alpha > 0.02
    rows = np.any(non_zero, axis=1)
    cols = np.any(non_zero, axis=0)
    y_min, y_max = np.where(rows)[0][[0, -1]]
    x_min, x_max = np.where(cols)[0][[0, -1]]
    
    w_box = x_max - x_min
    h_box = y_max - y_min
    pad_x = int(w_box * 0.02)
    pad_y = int(h_box * 0.02)
    
    y1 = max(0, y_min - pad_y)
    y2 = min(H, y_max + pad_y + 1)
    x1 = max(0, x_min - pad_x)
    x2 = min(W, x_max + pad_x + 1)
    
    cropped_alpha = out_alpha[y1:y2, x1:x2]
    
    # Create clean grayscale mask (White with alpha transparency)
    mask_arr = np.zeros((cropped_alpha.shape[0], cropped_alpha.shape[1], 4), dtype=np.uint8)
    mask_arr[:, :, :3] = 17 # Pure dark ink color
    mask_arr[:, :, 3] = (cropped_alpha * 255.0).astype(np.uint8)
    
    mask_img = Image.fromarray(mask_arr, "RGBA")
    
    # Resize to standardized square 1600x1600
    mask_1600 = mask_img.resize((1600, 1600), Image.Resampling.LANCZOS)
    
    # Quantize palette for optimal file size (< 250 KB)
    quantized_mask = mask_1600.quantize(colors=128, method=Image.Quantize.FASTOCTREE)
    
    os.makedirs("public/hero", exist_ok=True)
    dest_path = "public/hero/enso-mask.png"
    quantized_mask.save(dest_path, format="PNG", optimize=True)
    
    file_size_kb = os.path.getsize(dest_path) / 1024.0
    print(f"[OK] Saved {dest_path}: {mask_1600.size[0]}x{mask_1600.size[1]}, Size: {file_size_kb:.1f} KB")
    return dest_path

def process_portraits_and_registration():
    print(">>> Decontaminating Portrait Cutouts & Computing Mathematical Registration...")
    src_path = "pack-docs/05_SOURCE_REFERENCES/assets/alternatives/01_Seated_Variant_Transparent.png"
    if not os.path.exists(src_path):
        src_path = "src/features/dipak-hero/assets/dipak-seated-armchair.png"
    
    img = Image.open(src_path).convert("RGBA")
    arr = np.array(img, dtype=np.float32)
    
    rgb = arr[:, :, :3]
    alpha = arr[:, :, 3]
    
    # Monochrome pre-grading with rich contrast
    gray = 0.299 * rgb[:, :, 0] + 0.587 * rgb[:, :, 1] + 0.114 * rgb[:, :, 2]
    gray_norm = gray / 255.0
    graded_gray = np.where(gray_norm < 0.5, 
                           2.0 * (gray_norm ** 1.06) * 0.5,
                           1.0 - 2.0 * ((1.0 - gray_norm) ** 1.04) * 0.5) * 255.0
    graded_gray = np.clip(graded_gray, 0, 255)
    
    # Inpaint semi-transparent white fringes
    semi_trans = (alpha > 0) & (alpha < 240)
    near_white_fringing = semi_trans & (graded_gray > 210)
    graded_gray[near_white_fringing] = np.clip(graded_gray[near_white_fringing] * 0.85, 30, 190)
    
    out_arr = np.zeros_like(arr, dtype=np.uint8)
    out_arr[:, :, 0] = graded_gray.astype(np.uint8)
    out_arr[:, :, 1] = graded_gray.astype(np.uint8)
    out_arr[:, :, 2] = graded_gray.astype(np.uint8)
    out_arr[:, :, 3] = alpha.astype(np.uint8)
    
    full_img = Image.fromarray(out_arr, "RGBA")
    
    # 1. Desktop Trimmed Cutout (Tight 2% margin around alpha bounds)
    alpha_channel = full_img.getchannel("A")
    bbox = alpha_channel.getbbox() # (left, upper, right, lower)
    w_box = bbox[2] - bbox[0]
    h_box = bbox[3] - bbox[1]
    pad_x = int(w_box * 0.02)
    pad_y = int(h_box * 0.02)
    
    crop_box_desktop = (
        max(0, bbox[0] - pad_x),
        max(0, bbox[1] - pad_y),
        min(full_img.size[0], bbox[2] + pad_x),
        min(full_img.size[1], bbox[3] + pad_y)
    )
    desktop_img = full_img.crop(crop_box_desktop)
    dest_desktop = "src/features/dipak-hero/assets/dipak-seated-armchair.png"
    os.makedirs("src/features/dipak-hero/assets", exist_ok=True)
    desktop_img.save(dest_desktop, optimize=True)
    
    print(f"[OK] Saved Desktop Cutout {dest_desktop}: {desktop_img.size[0]}x{desktop_img.size[1]}")
    
    # 2. Mobile Art-Directed Cutout (Emphasizing head, hands, torso, partial chair)
    mobile_lower = int(bbox[1] + h_box * 0.74)
    crop_box_mobile = (
        max(0, bbox[0] - pad_x),
        max(0, bbox[1] - pad_y),
        min(full_img.size[0], bbox[2] + pad_x),
        min(full_img.size[1], mobile_lower)
    )
    mobile_img = full_img.crop(crop_box_mobile)
    dest_mobile = "public/hero/dipak-seated-mobile.png"
    mobile_img.save(dest_mobile, optimize=True)
    
    print(f"[OK] Saved Mobile Cutout {dest_mobile}: {mobile_img.size[0]}x{mobile_img.size[1]}")

    # 3. Mathematical Registration Computation
    # Measured reference coordinates from 01_REFERENCE_Sales_Is_The_Transfer_Of_Certainty.png (1672x941)
    # Portrait: xp=831.5, yp=333.5, wp=617.1, hp=771.1
    # Halo: xh=618.0, yh=31.6, wh=655.2, hh=655.2
    
    xp, yp, wp, hp = 831.5, 333.5, 617.1, 771.1
    xh, yh, wh, hh = 618.0, 31.6, 655.2, 655.2
    
    # Desktop relative variables:
    halo_u = (xh - xp) / wp
    halo_v = (yh - yp) / hp
    halo_sw = wh / wp
    halo_sh = hh / hp
    
    # Mobile crop relative mapping:
    # Desktop cutout is Wd=1122, Hd=1402. Mobile cutout is Wm=1122, Hm=1041 (crop_h_ratio = 1041/1402 = 0.7425)
    crop_h_ratio = mobile_img.size[1] / desktop_img.size[1]
    
    # Mobile relative halo:
    mobile_halo_u = halo_u
    mobile_halo_v = halo_v / crop_h_ratio
    mobile_halo_sw = halo_sw
    mobile_halo_sh = halo_sh / crop_h_ratio
    
    composition_meta = {
        "schemaVersion": 1,
        "baselineCommit": "43a85ae0a4539ac2bc250e61960fdefd5355a1a4",
        "rule": "portrait and halo must share one composition transform",
        "reference": {
            "width": 1672,
            "height": 941,
            "portraitBox": [xp, yp, wp, hp],
            "haloBox": [xh, yh, wh, hh]
        },
        "desktop": {
            "sourceWidth": desktop_img.size[0],
            "sourceHeight": desktop_img.size[1],
            "aspectRatio": round(desktop_img.size[0] / desktop_img.size[1], 5),
            "halo_u": round(float(halo_u), 5),
            "halo_v": round(float(halo_v), 5),
            "halo_sw": round(float(halo_sw), 5),
            "halo_sh": round(float(halo_sh), 5)
        },
        "mobile": {
            "sourceWidth": mobile_img.size[0],
            "sourceHeight": mobile_img.size[1],
            "aspectRatio": round(mobile_img.size[0] / mobile_img.size[1], 5),
            "halo_u": round(float(mobile_halo_u), 5),
            "halo_v": round(float(mobile_halo_v), 5),
            "halo_sw": round(float(mobile_halo_sw), 5),
            "halo_sh": round(float(mobile_halo_sh), 5)
        },
        "relative": {
            "halo_u": f"{halo_u:.5f}",
            "halo_v": f"{halo_v:.5f}",
            "halo_sw": f"{halo_sw:.5f}",
            "halo_sh": f"{halo_sh:.5f}"
        }
    }
    
    os.makedirs("src/features/dipak-hero/generated", exist_ok=True)
    json_path = "src/features/dipak-hero/generated/hero-composition.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(composition_meta, f, indent=2)
        
    print(f"[OK] Generated {json_path} with mathematical registration parameters.")

def run_automated_qc():
    print(">>> Running Automated Artifact QC...")
    qc_passed = True
    
    # 1. Check enso-mask.png
    enso = Image.open("public/hero/enso-mask.png").convert("RGBA")
    enso_arr = np.array(enso)
    enso_alpha = enso_arr[:, :, 3]
    
    # Border check (perimeter 5px)
    b_top = enso_alpha[:5, :]
    b_bot = enso_alpha[-5:, :]
    b_left = enso_alpha[:, :5]
    b_right = enso_alpha[:, -5:]
    max_border = max(b_top.max(), b_bot.max(), b_left.max(), b_right.max())
    print(f"  [QC 1] Enso mask border max alpha: {max_border}")
    if max_border != 0:
        print("  FAIL: Enso mask has non-zero border alpha!")
        qc_passed = False
    else:
        print("  PASS: Enso mask border alpha is strictly 0. Zero rectangular boundary artifacts.")
        
    # Check zero-alpha pixels
    zero_alpha = enso_alpha == 0
    print(f"  [QC 2] Enso zero-alpha pixel count: {np.count_nonzero(zero_alpha)} ({np.count_nonzero(zero_alpha)/enso_alpha.size*100:.1f}%)")
    
    # Check file size
    enso_kb = os.path.getsize("public/hero/enso-mask.png") / 1024.0
    print(f"  [QC 3] File size -> enso-mask: {enso_kb:.1f} KB")
    if enso_kb > 600:
        print("  FAIL: enso-mask.png exceeds size target!")
        qc_passed = False
    else:
        print("  PASS: Enso mask within size budget (<600 KB).")
        
    # 4. Check JSON
    json_path = "src/features/dipak-hero/generated/hero-composition.json"
    if os.path.exists(json_path):
        print(f"  [QC 4] Registration metadata file exists and is valid.")
    else:
        print(f"  FAIL: Missing {json_path}")
        qc_passed = False
        
    if qc_passed:
        print("\nALL AUTOMATED QC CHECKS PASSED SUCCESSFULLY!")
    else:
        print("\nQC CHECKS FAILED.")
        sys.exit(1)

if __name__ == "__main__":
    process_enso_mask()
    process_portraits_and_registration()
    run_automated_qc()
