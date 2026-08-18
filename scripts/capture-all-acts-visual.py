from playwright.sync_api import sync_playwright
import os

dir_path = 'C:/Users/Suyash/.gemini/antigravity/brain/d7bea921-5b8a-46af-a969-e1a869b19da0/.tempmediaStorage'
os.makedirs(dir_path, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:3000', wait_until='networkidle')
    page.wait_for_timeout(1000)

    # 1. Pinned Story Shell 1-4
    shell_height = page.evaluate("document.querySelector('[class*=\"storyShell\"]').offsetHeight")
    page.evaluate("window.scrollTo({top: 0, behavior: 'instant'})")
    page.wait_for_timeout(400)
    page.screenshot(path=f'{dir_path}/act1_hero.png')

    page.evaluate(f"window.scrollTo({{top: {int(shell_height * 0.28)}, behavior: 'instant'}})")
    page.wait_for_timeout(400)
    page.screenshot(path=f'{dir_path}/act2_identity.png')

    page.evaluate(f"window.scrollTo({{top: {int(shell_height * 0.50)}, behavior: 'instant'}})")
    page.wait_for_timeout(400)
    page.screenshot(path=f'{dir_path}/act3_presence.png')

    page.evaluate(f"window.scrollTo({{top: {int(shell_height * 0.90)}, behavior: 'instant'}})")
    page.wait_for_timeout(400)
    page.screenshot(path=f'{dir_path}/act4_manifesto.png')

    # 2. Pinned Act 5 (Domains 1-4)
    act5_el = page.query_selector('#topics')
    if act5_el:
        act5_top = page.evaluate("document.querySelector('#topics').offsetTop")
        act5_height = page.evaluate("document.querySelector('#topics').offsetHeight")

        page.evaluate(f"window.scrollTo({{top: {act5_top + 100}, behavior: 'instant'}})")
        page.wait_for_timeout(500)
        page.screenshot(path=f'{dir_path}/act5_domain1.png')

        page.evaluate(f"window.scrollTo({{top: {act5_top + int(act5_height * 0.35)}, behavior: 'instant'}})")
        page.wait_for_timeout(500)
        page.screenshot(path=f'{dir_path}/act5_domain2.png')

        page.evaluate(f"window.scrollTo({{top: {act5_top + int(act5_height * 0.62)}, behavior: 'instant'}})")
        page.wait_for_timeout(500)
        page.screenshot(path=f'{dir_path}/act5_domain3.png')

        page.evaluate(f"window.scrollTo({{top: {act5_top + int(act5_height * 0.88)}, behavior: 'instant'}})")
        page.wait_for_timeout(500)
        page.screenshot(path=f'{dir_path}/act5_domain4.png')

    # 3. Acts 6 & 7
    act6_el = page.query_selector('#thinking')
    if act6_el:
        act6_el.scroll_into_view_if_needed()
        page.wait_for_timeout(600)
        page.screenshot(path=f'{dir_path}/act6_thinking.png')

    act7_el = page.query_selector('#authority-closers')
    if act7_el:
        act7_el.scroll_into_view_if_needed()
        page.wait_for_timeout(600)
        page.screenshot(path=f'{dir_path}/act7_bridge.png')

    page.close()
    browser.close()

print('ALL ACT SCREENSHOTS CAPTURED!')
