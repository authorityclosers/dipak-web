from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:3000', wait_until='networkidle')
    page.wait_for_timeout(600)

    # Scroll down to Act 3 hold position (around 1100px)
    page.evaluate('window.scrollTo({top: 1100, behavior: "instant"})')
    page.wait_for_timeout(700)
    page.screenshot(path='C:/Users/Suyash/.gemini/antigravity/brain/d7bea921-5b8a-46af-a969-e1a869b19da0/.tempmediaStorage/act3_photo_match.png')
    page.close()
    browser.close()

print('CAPTURED_ACT3')
