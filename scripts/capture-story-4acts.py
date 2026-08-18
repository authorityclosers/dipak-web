from playwright.sync_api import sync_playwright
import os

dir_path = 'C:/Users/Suyash/.gemini/antigravity/brain/d7bea921-5b8a-46af-a969-e1a869b19da0/.tempmediaStorage'
os.makedirs(dir_path, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:3000', wait_until='networkidle')
    page.wait_for_timeout(1000)

    shell_height = page.evaluate("document.querySelector('[class*=\"storyShell\"]').offsetHeight")
    print(f'Pinned shell height: {shell_height}')

    milestones = [
        ('hero', 0.0),
        ('act2_identity', 0.25),
        ('act3_presence', 0.55),
        ('act3_to_act4_transition', 0.72),
        ('act4_mission_manifesto', 0.88),
    ]

    for label, progress in milestones:
        scroll_y = int(shell_height * progress)
        page.evaluate(f"window.scrollTo({{top: {scroll_y}, behavior: 'instant'}})")
        page.wait_for_timeout(700)
        page.screenshot(path=f'{dir_path}/desktop_4act_{label}.png')
        print(f'Captured desktop_4act_{label}.png at scroll {scroll_y}px')

    page.close()
    browser.close()

print('ALL 4-ACT STORY SCREENSHOTS CAPTURED!')
