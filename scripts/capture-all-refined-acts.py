from playwright.sync_api import sync_playwright
import os

dir_path = 'C:/Users/Suyash/.gemini/antigravity/brain/d7bea921-5b8a-46af-a969-e1a869b19da0/.tempmediaStorage'
os.makedirs(dir_path, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()

    # 1. DESKTOP CAPTURE (1440x900)
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:3000', wait_until='networkidle')
    page.wait_for_timeout(1000)

    shell_height = page.evaluate("document.querySelector('[class*=\"storyShell\"]').offsetHeight")

    desktop_shots = [
        ('act1_hero', 0),
        ('act2_identity', int(shell_height * 0.28)),
        ('act3_presence', int(shell_height * 0.58)),
        ('act4_manifesto', int(shell_height * 0.92)),
    ]

    for name, scroll_y in desktop_shots:
        page.evaluate(f"window.scrollTo({{top: {scroll_y}, behavior: 'instant'}})")
        page.wait_for_timeout(600)
        page.screenshot(path=f'{dir_path}/refined_desktop_{name}.png')
        print(f'Captured refined_desktop_{name}.png at {scroll_y}px')

    # Capture Acts 5, 6, 7 by element scrolling
    for act_id in ['topics', 'thinking', 'authority-closers']:
        el = page.query_selector(f'#{act_id}')
        if el:
            el.scroll_into_view_if_needed()
            page.wait_for_timeout(600)
            page.screenshot(path=f'{dir_path}/refined_desktop_{act_id}.png')
            print(f'Captured refined_desktop_{act_id}.png')

    page.close()

    # 2. MOBILE CAPTURE (390x844)
    mobile_page = browser.new_page(viewport={'width': 390, 'height': 844})
    mobile_page.goto('http://localhost:3000', wait_until='networkidle')
    mobile_page.wait_for_timeout(1000)

    for act_id in ['identity', 'presence', 'mission', 'topics', 'thinking', 'authority-closers']:
        el = mobile_page.query_selector(f'#{act_id}')
        if el:
            el.scroll_into_view_if_needed()
            mobile_page.wait_for_timeout(400)
            mobile_page.screenshot(path=f'{dir_path}/refined_mobile_{act_id}.png')
            print(f'Captured refined_mobile_{act_id}.png')

    mobile_page.close()
    browser.close()

print('ALL SCREENSHOTS SUCCESSFULLY CAPTURED!')
