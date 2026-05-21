import os
from pathlib import Path
from playwright.sync_api import sync_playwright

svg_dir = Path("assets/images")

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1280, "height": 720})

    for svg_path in svg_dir.glob("*.svg"):
        png_path = svg_path.with_suffix(".png")
        page.set_viewport_size({"width": 1200, "height": 630})
        file_url = svg_path.resolve().as_uri()
        page.goto(file_url)
        # Small wait for fonts/layout
        page.wait_for_timeout(500)
        page.screenshot(path=str(png_path), full_page=False, type="png")
        print(f"Converted: {svg_path.name} -> {png_path.name}")

    browser.close()

print("All SVGs converted to PNG!")
