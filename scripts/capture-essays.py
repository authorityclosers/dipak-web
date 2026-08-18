from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:3000', wait_until='networkidle')
    page.wait_for_timeout(600)

    thinking_top = page.evaluate('document.querySelector("#thinking").getBoundingClientRect().top + window.scrollY')
    page.evaluate(f'window.scrollTo({{top: {thinking_top + 750}, behavior: "instant"}})')
    page.wait_for_timeout(600)
    page.screenshot(path='C:/Users/Suyash/.gemini/antigravity/brain/d7bea921-5b8a-46af-a969-e1a869b19da0/.tempmediaStorage/grand_vertical_act6_essays_full.png')
    page.close()
    browser.close()

print('CAPTURED')
