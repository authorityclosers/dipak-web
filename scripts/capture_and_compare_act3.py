from pathlib import Path
import argparse
import numpy as np
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_REFERENCE = ROOT / "reference-act3.png"
DEFAULT_ACTUAL = ROOT / "act3-actual.png"
DEFAULT_DIFF = ROOT / "act3-diff.png"


def capture(url: str, output: Path, scroll_y: int) -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1672, "height": 941}, device_scale_factor=1)
        page.goto(url, wait_until="networkidle")
        page.evaluate("document.fonts.ready")
        page.wait_for_timeout(500)
        page.evaluate(f'window.scrollTo({{ top: {scroll_y}, behavior: "instant" }})')
        page.wait_for_timeout(700)
        page.screenshot(path=str(output), full_page=False)
        browser.close()


def compare(reference: Path, actual: Path, diff_out: Path) -> None:
    ref = np.asarray(Image.open(reference).convert("RGB"), dtype=np.int16)
    act = np.asarray(Image.open(actual).convert("RGB"), dtype=np.int16)
    if ref.shape != act.shape:
        raise SystemExit(f"Size mismatch: reference={ref.shape[1]}x{ref.shape[0]}, actual={act.shape[1]}x{act.shape[0]}")

    delta = np.abs(ref - act)
    per_pixel = delta.mean(axis=2)
    mae = float(delta.mean())
    p95 = float(np.percentile(per_pixel, 95))
    ratio_12 = float((per_pixel > 12).mean())

    # Human-readable amplified diff; black = matched, brighter = farther away.
    diff = np.clip(delta.astype(np.int32) * 4, 0, 255).astype(np.uint8)
    Image.fromarray(diff).save(diff_out)

    print(f"RGB MAE: {mae:.3f}")
    print(f"95th percentile pixel error: {p95:.3f}")
    print(f"Pixels with mean channel delta > 12: {ratio_12:.2%}")
    print(f"Diff written to: {diff_out}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default="http://localhost:3000")
    parser.add_argument("--scroll", type=int, default=1450)
    parser.add_argument("--reference", type=Path, default=DEFAULT_REFERENCE)
    parser.add_argument("--actual", type=Path, default=DEFAULT_ACTUAL)
    parser.add_argument("--diff", type=Path, default=DEFAULT_DIFF)
    parser.add_argument("--skip-capture", action="store_true")
    args = parser.parse_args()

    if not args.skip_capture:
        capture(args.url, args.actual, args.scroll)
    compare(args.reference, args.actual, args.diff)


if __name__ == "__main__":
    main()
