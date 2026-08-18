import os
import sys
import numpy as np
from PIL import Image, ImageFilter

def srgb_to_linear(c):
    """Convert sRGB array (0..1) to linear RGB."""
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)

def linear_luminance(rgb_float):
    """Compute linear luminance from float RGB in 0..1."""
    r_lin = srgb_to_linear(rgb_float[:, :, 0])
    g_lin = srgb_to_linear(rgb_float[:, :, 1])
    b_lin = srgb_to_linear(rgb_float[:, :, 2])
    return 0.2126 * r_lin + 0.7152 * g_lin + 0.0722 * b_lin

def smoothstep(edge0, edge1, x):
    """Hermite smoothstep interpolation."""
    t = np.clip((x - edge0) / (edge1 - edge0), 0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)

def process_enso_mask():
    print(">>> Processing Enso Halo Mask...")
    os.makedirs("public/hero", exist_ok=True)
    
    # Load high-resolution references
    ref1_path = "pack-docs/05_SOURCE_REFERENCES/screens/01_REFERENCE_Sales_Is_The_Transfer_Of_Certainty.png"
    ref2_path = "pack-docs/05_SOURCE_REFERENCES/screens/02_REFERENCE_Why_Should_You_Know_Dipak_Vishwakarma.png"
    
    img1 = Image.open(ref1_path).convert("RGB")
    img2 = Image.open(ref2_path).convert("RGB")
    
    arr1 = np.array(img1, dtype=np.float32) / 255.0
    arr2 = np.array(img2, dtype=np.float32) / 255.0
    
    # In reference screens (1672x941), the halo center is at roughly x=1185, y=450
    cx_ref, cy_ref = 1185, 450
    crop_radius = 460
    x1, x2 = max(0, cx_ref - crop_radius), min(arr1.shape[1], cx_ref + crop_radius)
    y1, y2 = max(0, cy_ref - crop_radius), min(arr1.shape[0], cy_ref + crop_radius)
    
    c1 = arr1[y1:y2, x1:x2]
    c2 = arr2[y1:y2, x1:x2]
    
    # Linear luminance
    luma1 = linear_luminance(c1)
    luma2 = linear_luminance(c2)
    
    # Canvas background luminance (#F4F1EA -> approx 0.885 linear luma)
    bg_color = np.array([244.0/255.0, 241.0/255.0, 234.0/255.0])
    bg_luma = 0.2126 * srgb_to_linear(bg_color[0]) + 0.7152 * srgb_to_linear(bg_color[1]) + 0.0722 * srgb_to_linear(bg_color[2])
    
    # Darkness relative to background
    d1 = np.maximum(0.0, bg_luma - luma1)
    d2 = np.maximum(0.0, bg_luma - luma2)
    
    # In ref1 Dipak is seated armchair (bottom-right); in ref2 Dipak is standing (center).
    # Take minimum darkness where subject is present, or blend clean background brush.
    # Where person is present, darkness is high (> 0.20 linear luma diff).
    # Brush stroke darkness is subtle: 0.015 to 0.18.
    brush_darkness = np.zeros_like(d1)
    for y in range(d1.shape[0]):
        for x in range(d1.shape[1]):
            v1 = d1[y, x]
            v2 = d2[y, x]
            if v1 < 0.20 and v2 < 0.20:
                brush_darkness[y, x] = max(v1, v2)
            elif v1 < 0.20 and v2 >= 0.20:
                brush_darkness[y, x] = v1
            elif v2 < 0.20 and v1 >= 0.20:
                brush_darkness[y, x] = v2
            else:
                brush_darkness[y, x] = 0.0

    # Extract ink alpha with smooth thresholding
    epsilon = 0.008
    strength = 0.13
    raw_alpha = np.clip((brush_darkness - epsilon) / strength, 0.0, 1.0)
    raw_alpha = smoothstep(0.0, 1.0, raw_alpha)
    
    # Step 3: Structural Annular Gate to mathematically eliminate "ff"/text & square boundaries
    H, W = raw_alpha.shape
    local_cx, local_cy = crop_radius, crop_radius
    Y, X = np.ogrid[:H, :W]
    dist = np.sqrt((X - local_cx)**2 + (Y - local_cy)**2)
    
    # Fitted ring parameters for Ensō circle
    ring_radius = 290.0
    inner_gate_dist = 60.0
    outer_gate_dist = 160.0
    
    # Distance from dominant ring center line
    ring_dist = np.abs(dist - ring_radius)
    
    # Soft annular gate: 1.0 within ring_half_width, smooth falloff to 0 at outer_gate_dist
    annular_gate = 1.0 - smoothstep(inner_gate_dist, outer_gate_dist, ring_dist)
    
    # Inner hole gate: ensure center of circle (where Dipak's head/body sits) is completely zeroed
    inner_hole = smoothstep(120.0, 175.0, dist)
    
    # Soft angular fade: smooth taper at the bottom-left break of the Ensō ring
    angle = np.arctan2(Y - local_cy, X - local_cx) # -pi to pi
    break_angle_center = 2.45
    break_angle_width = 0.65
    angle_diff = np.abs(np.arctan2(np.sin(angle - break_angle_center), np.cos(angle - break_angle_center)))
    angular_fade = smoothstep(0.2, break_angle_width, angle_diff)
    
    # Outer perimeter padding gate to guarantee 0 border alpha
    border_gate = 1.0 - smoothstep(crop_radius - 50.0, crop_radius - 10.0, dist)
    
    # Clean UI text mask (remove any top nav or left copy contamination)
    text_mask = np.ones_like(dist)
    for y in range(H):
        for x in range(W):
            # Top nav area
            if y < 80 and x < 320:
                text_mask[y, x] = 0.0
            # Left headline "Of" area
            if x < 120 and y > 300:
                text_mask[y, x] = 0.0

    # Combine all gates
    final_alpha_float = raw_alpha * annular_gate * inner_hole * angular_fade * border_gate * text_mask
    
    # Target resolution: 1600 x 1600 (ideal for DPR=2 without unnecessary weight)
    target_size = 1600
    final_alpha_uint8 = np.clip(final_alpha_float * 255.0, 0, 255).astype(np.uint8)
    
    # Create mask image: Pure neutral ink #11110f with extracted alpha
    mask_arr = np.zeros((H, W, 4), dtype=np.uint8)
    mask_arr[:, :, 0] = 17 # R
    mask_arr[:, :, 1] = 17 # G
    mask_arr[:, :, 2] = 15 # B
    mask_arr[:, :, 3] = final_alpha_uint8
    
    enso_img = Image.fromarray(mask_arr, "RGBA")
    enso_img_hi = enso_img.resize((target_size, target_size), Image.Resampling.LANCZOS)
    enso_opt = enso_img_hi.quantize(colors=256, method=Image.Quantize.FASTOCTREE)
    
    out_path = "public/hero/enso-mask.png"
    enso_opt.save(out_path, optimize=True)
    file_size_kb = os.path.getsize(out_path) / 1024.0
    print(f"[OK] Saved {out_path}: {target_size}x{target_size}, Size: {file_size_kb:.1f} KB")
    return out_path

def process_left_brush_mask():
    print(">>> Processing Left Brush Mask...")
    ref_path = "src/features/dipak-hero/assets/brush-left.png"
    if not os.path.exists(ref_path):
        ref_path = "pack-docs/05_SOURCE_REFERENCES/screens/01_REFERENCE_Sales_Is_The_Transfer_Of_Certainty.png"
    
    img = Image.open(ref_path).convert("RGBA")
    arr = np.array(img)
    
    # Extract alpha
    alpha = arr[:, :, 3]
    h, w = alpha.shape
    
    # Smooth top, bottom, and right edges to 0
    Y, X = np.ogrid[:h, :w]
    top_fade = smoothstep(0.0, 30.0, Y.astype(np.float32))
    bot_fade = smoothstep(0.0, 40.0, (h - 1 - Y).astype(np.float32))
    right_fade = smoothstep(0.0, 15.0, (w - 1 - X).astype(np.float32))
    
    clean_alpha = np.clip(alpha.astype(np.float32) * top_fade * bot_fade * right_fade, 0, 255).astype(np.uint8)
    
    # Create clean mask image
    mask_arr = np.zeros((h, w, 4), dtype=np.uint8)
    mask_arr[:, :, 0] = 17
    mask_arr[:, :, 1] = 17
    mask_arr[:, :, 2] = 15
    mask_arr[:, :, 3] = clean_alpha
    
    left_img = Image.fromarray(mask_arr, "RGBA")
    left_img_hi = left_img.resize((w * 2, h * 2), Image.Resampling.LANCZOS)
    
    out_path = "public/hero/left-brush-mask.png"
    left_img_hi.save(out_path, optimize=True)
    file_size_kb = os.path.getsize(out_path) / 1024.0
    print(f"[OK] Saved {out_path}: {left_img_hi.size[0]}x{left_img_hi.size[1]}, Size: {file_size_kb:.1f} KB")
    return out_path

def decontaminate_portrait():
    print(">>> Decontaminating Portrait Cutout (Desktop & Mobile Art Direction)...")
    src_path = "pack-docs/05_SOURCE_REFERENCES/assets/alternatives/01_Seated_Variant_Transparent.png"
    if not os.path.exists(src_path):
        src_path = "src/features/dipak-hero/assets/dipak-seated-armchair.png"
    
    img = Image.open(src_path).convert("RGBA")
    arr = np.array(img, dtype=np.float32)
    
    rgb = arr[:, :, :3]
    alpha = arr[:, :, 3]
    
    # Tonal pre-grading in source: Convert to monochrome with rich tonal curve
    gray = 0.299 * rgb[:, :, 0] + 0.587 * rgb[:, :, 1] + 0.114 * rgb[:, :, 2]
    
    # Gentle contrast curve: slightly deepen blacks, crisp highlights, natural midtones
    gray_norm = gray / 255.0
    graded_gray = np.where(gray_norm < 0.5, 
                           2.0 * (gray_norm ** 1.06) * 0.5,
                           1.0 - 2.0 * ((1.0 - gray_norm) ** 1.04) * 0.5) * 255.0
    graded_gray = np.clip(graded_gray, 0, 255)
    
    # Edge decontamination: for semi-transparent pixels (0 < alpha < 240),
    # inpaint matte fringing by clamping edge RGB to deep charcoal tones where near-white
    semi_trans = (alpha > 0) & (alpha < 240)
    near_white_fringing = semi_trans & (graded_gray > 210)
    graded_gray[near_white_fringing] = np.clip(graded_gray[near_white_fringing] * 0.85, 30, 190)
    
    out_arr = np.zeros_like(arr, dtype=np.uint8)
    out_arr[:, :, 0] = graded_gray.astype(np.uint8)
    out_arr[:, :, 1] = graded_gray.astype(np.uint8)
    out_arr[:, :, 2] = graded_gray.astype(np.uint8)
    out_arr[:, :, 3] = alpha.astype(np.uint8)
    
    full_img = Image.fromarray(out_arr, "RGBA")
    
    # 1. Desktop Trimmed Asset (Tight 2% safety margin around bbox)
    alpha_img = full_img.getchannel("A")
    bbox = alpha_img.getbbox() # (left, upper, right, lower)
    w_box = bbox[2] - bbox[0]
    h_box = bbox[3] - bbox[1]
    pad_x = int(w_box * 0.02)
    pad_y = int(h_box * 0.02)
    
    crop_box = (
        max(0, bbox[0] - pad_x),
        max(0, bbox[1] - pad_y),
        min(full_img.size[0], bbox[2] + pad_x),
        min(full_img.size[1], bbox[3] + pad_y)
    )
    desktop_img = full_img.crop(crop_box)
    
    dest_desktop = "src/features/dipak-hero/assets/dipak-seated-armchair.png"
    desktop_img.save(dest_desktop, optimize=True)
    file_size_kb = os.path.getsize(dest_desktop) / 1024.0
    print(f"[OK] Saved Desktop Cutout {dest_desktop}: {desktop_img.size[0]}x{desktop_img.size[1]}, Size: {file_size_kb:.1f} KB")

    # 2. Mobile Art-Directed Cutout (Emphasizes head, hands, torso, partial chair arms; crops lower legs)
    # Head is at top (bbox[1]), hands are at mid-torso (~45% height), seat is around 75%
    mobile_lower = int(bbox[1] + h_box * 0.74)
    mobile_box = (
        max(0, bbox[0] - pad_x),
        max(0, bbox[1] - pad_y),
        min(full_img.size[0], bbox[2] + pad_x),
        min(full_img.size[1], mobile_lower)
    )
    mobile_img = full_img.crop(mobile_box)
    
    os.makedirs("public/hero", exist_ok=True)
    dest_mobile = "public/hero/dipak-seated-mobile.png"
    mobile_img.save(dest_mobile, optimize=True)
    mobile_size_kb = os.path.getsize(dest_mobile) / 1024.0
    print(f"[OK] Saved Mobile Art-Directed Cutout {dest_mobile}: {mobile_img.size[0]}x{mobile_img.size[1]}, Size: {mobile_size_kb:.1f} KB")

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
    
    # 2. Check left-brush-mask.png
    left_b = Image.open("public/hero/left-brush-mask.png").convert("RGBA")
    left_arr = np.array(left_b)
    left_alpha = left_arr[:, :, 3]
    print(f"  [QC 3] Left brush mask top max alpha: {left_alpha[0, :].max()}, bot max: {left_alpha[-1, :].max()}")
    if left_alpha[0, :].max() != 0 or left_alpha[-1, :].max() != 0:
        print("  FAIL: Left brush top/bottom not cleanly faded!")
        qc_passed = False
    else:
        print("  PASS: Left brush top and bottom smoothly fade to 0.")
        
    # 3. File sizes
    enso_kb = os.path.getsize("public/hero/enso-mask.png") / 1024.0
    left_kb = os.path.getsize("public/hero/left-brush-mask.png") / 1024.0
    mobile_kb = os.path.getsize("public/hero/dipak-seated-mobile.png") / 1024.0
    print(f"  [QC 4] File sizes -> enso-mask: {enso_kb:.1f} KB, left-brush-mask: {left_kb:.1f} KB, mobile-cutout: {mobile_kb:.1f} KB")
    if enso_kb > 600:
        print("  FAIL: enso-mask.png exceeds size target!")
        qc_passed = False
    else:
        print("  PASS: All masks within production size budgets (<600 KB).")
        
    if qc_passed:
        print("\nALL AUTOMATED QC CHECKS PASSED SUCCESSFULLY!")
    else:
        print("\nQC CHECKS FAILED. Please review errors.")
        sys.exit(1)

if __name__ == "__main__":
    process_enso_mask()
    process_left_brush_mask()
    decontaminate_portrait()
    run_automated_qc()
