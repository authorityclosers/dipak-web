from playwright.sync_api import sync_playwright
import os

dir_path = 'C:/Users/Suyash/.gemini/antigravity/brain/d7bea921-5b8a-46af-a969-e1a869b19da0/.tempmediaStorage'
os.makedirs(dir_path, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()
    
    # 1. Desktop 1440x900
    page = browser.new_page(viewport={'width': 1440, 'height': 900})
    page.goto('http://localhost:3000', wait_until='networkidle')
    page.wait_for_timeout(1000)
    
    acts = [
        ('act1_hero', '#hero'),
        ('act2_identity', '#identity'),
        ('act3_presence', '#presence'),
        ('act4_mission', '#mission'),
        ('act5_topics', '#topics'),
        ('act6_thinking', '#thinking'),
        ('act7_bridge', '#authority-closers')
    ]
    
    for name, sel in acts:
        el = page.locator(sel)
        if el.count() > 0:
            box = el.bounding_box()
            if box:
                # Scroll window to element position
                page.evaluate(f"window.scrollTo({{top: {box['y'] + page.evaluate('window.scrollY')}, behavior: 'instant'}})")
                page.wait_for_timeout(800)
                page.screenshot(path=f'{dir_path}/desktop_{name}.png')
                print(f'Saved desktop_{name}.png')
            
    page.close()
    
    # 2. Mobile 390x844
    mobile_page = browser.new_page(viewport={'width': 390, 'height': 844})
    mobile_page.goto('http://localhost:3000', wait_until='networkidle')
    mobile_page.wait_for_timeout(1000)
    
    for name, sel in acts:
        el = mobile_page.locator(sel)
        if el.count() > 0:
            box = el.bounding_box()
            if box:
                mobile_page.evaluate(f"window.scrollTo({{top: {box['y'] + mobile_page.evaluate('window.scrollY')}, behavior: 'instant'}})")
                mobile_page.wait_for_timeout(800)
                mobile_page.screenshot(path=f'{dir_path}/mobile_{name}.png')
                print(f'Saved mobile_{name}.png')
            
    mobile_page.close()
    browser.close()

print('ALL ACTS 1-7 SCREENSHOTS CAPTURED!')
