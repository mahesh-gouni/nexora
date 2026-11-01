# Nexora artwork

Original 3D artwork for the website, built as Three.js scenes and rendered offline.
No stock imagery and no AI image services: every image is generated from the code here.

- `harness.html`: shared renderer, lighting and the Nexora material library (graphite, ink, amber, smoked glass).
- `scenes/*.js`: one composition per image (hero, six services, about, stack, CTA).
- `render.py`: renders scenes to transparent PNGs in `out/` using Playwright's Chromium (WebGL via SwiftShader).
- `export.mjs`: converts `out/*.png` to responsive AVIF + WebP files in `web/public/art/`.

```bash
cd art
npm install
pip install playwright && python -m playwright install chromium
python render.py hero:2400:1500 svc-web:1600:1600 svc-commerce:1600:1600 svc-erp:1600:1600 \
  svc-dashboard:1600:1600 svc-saas:1600:1600 svc-automation:1600:1600 about:2400:1500 stack:1600:1600 cta:2000:1200
npm run export
```

If you add or resize an image, update `artSizes` / `artRatio` in `web/app/components/art.tsx`.
