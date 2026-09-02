const fs = require('fs');
const { PNG } = require('pngjs');

const data = fs.readFileSync('public/realistic_airliner_transparent.png');
const png = PNG.sync.read(data);
const width = png.width;
const height = png.height;
const imgData = png.data;

// Clean any leftover isolated white/light-grey background dots
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) << 2;
    const a = imgData[idx + 3];
    if (a > 0) {
      const r = imgData[idx];
      const g = imgData[idx + 1];
      const b = imgData[idx + 2];

      // Check if it's pure background white that got trapped in interior empty regions (like between landing gear struts)
      if (r >= 244 && g >= 244 && b >= 244) {
        // If near top or bottom edges (outside fuselage)
        if (y < height * 0.18 || y > height * 0.85) {
          imgData[idx + 3] = 0;
        }
      }
    }
  }
}

const buffer = PNG.sync.write(png);
fs.writeFileSync('public/realistic_airliner_clean.png', buffer);
console.log('Written to public/realistic_airliner_clean.png');
