from playwright.sync_api import sync_playwright
import os

dir_path = 'C:/Users/Suyash/.gemini/antigravity/brain/d7bea921-5b8a-46af-a969-e1a869b19da0/.tempmediaStorage'
os.makedirs(dir_path, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:3000', wait_until='networkidle')
    page.wait_for_timeout(800)

    act5_top = page.evaluate('document.querySelector("#topics").getBoundingClientRect().top + window.scrollY')
    act5_h = page.evaluate('document.querySelector("#topics").offsetHeight')
    print(f'act5_top: {act5_top}, act5_h: {act5_h}')

    # Capture 4 domain slides
    slides = [
        ('domain1_systems', 0.05),
        ('domain2_psychology', 0.35),
        ('domain3_authority', 0.65),
        ('domain4_leadership', 0.92),
    ]

    for name, prog in slides:
        target_y = int(act5_top + (act5_h * prog))
        page.evaluate(f'window.scrollTo({{top: {target_y}, behavior: "instant"}})')
        page.wait_for_timeout(600)
        page.screenshot(path=f'{dir_path}/real_act5_{name}.png')
        print(f'Captured real_act5_{name}.png at {target_y}px')

    page.close()
    browser.close()

print('ALL 4 DOMAINS CAPTURED!')
