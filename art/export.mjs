// Converts rendered PNGs in out/ to AVIF + WebP sizes in web/public/art/.
import sharp from "sharp";
const spec = {
  hero: [1000, 1600, 2400],
  "svc-web": [600, 1000], "svc-commerce": [600, 1000], "svc-erp": [600, 1000],
  "svc-dashboard": [600, 1000], "svc-saas": [600, 1000], "svc-automation": [600, 1000],
  about: [1000, 1800], stack: [600, 1000], cta: [900, 1600],
};
const out = new URL("../web/public/art/", import.meta.url).pathname;
for (const [name, widths] of Object.entries(spec)) {
  for (const w of widths) {
    const img = sharp(new URL(`out/${name}.png`, import.meta.url).pathname).resize(w);
    await img.clone().avif({ quality: 58, effort: 6 }).toFile(`${out}${name}-${w}.avif`);
    await img.clone().webp({ quality: 80, alphaQuality: 90, effort: 6 }).toFile(`${out}${name}-${w}.webp`);
  }
  console.log("exported", name);
}
