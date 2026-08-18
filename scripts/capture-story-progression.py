from playwright.sync_api import sync_playwright
import os

dir_path = 'C:/Users/Suyash/.gemini/antigravity/brain/d7bea921-5b8a-46af-a969-e1a869b19da0/.tempmediaStorage'
os.makedirs(dir_path, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:3000', wait_until='networkidle')
    page.wait_for_timeout(1000)

    # Total pinned story shell height
    shell_height = page.evaluate("document.querySelector('.home-intro-story-module__cZ-t9G__storyShell, [class*=\"storyShell\"]').offsetHeight")
    print(f'Pinned shell height: {shell_height}')

    # Capture key milestones
    milestones = [
        ('p00_hero', 0.0),
        ('p20_hero_exit', 0.20),
        ('p40_act2_enter', 0.40),
        ('p55_act2_hold', 0.55),
        ('p75_act2_to_act3_morph', 0.75),
        ('p95_act3_ledger_hold', 0.95),
    ]

    for label, progress in milestones:
        scroll_y = int(shell_height * progress)
        page.evaluate(f"window.scrollTo({{top: {scroll_y}, behavior: 'instant'}})")
        page.wait_for_timeout(600)
        page.screenshot(path=f'{dir_path}/desktop_milestone_{label}.png')
        print(f'Captured desktop_milestone_{label}.png at scroll {scroll_y}px')

    page.close()
    browser.close()

print('ALL MILESTONES CAPTURED!')
