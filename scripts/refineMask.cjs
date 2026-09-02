const fs = require('fs');
const { PNG } = require('pngjs');

const data = fs.readFileSync('public/boeing747_real_transparent.png');
const png = PNG.sync.read(data);

const width = png.width;
const height = png.height;
const imgData = png.data;

// Also check any leftover grey cloud pixels anywhere that match sky color
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) << 2;
    const a = imgData[idx + 3];
    if (a > 0) {
      const r = imgData[idx];
      const g = imgData[idx + 1];
      const b = imgData[idx + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);

      // Check if it's an isolated cloudy grey sky pixel
      if (max - min < 28 && r > 90 && r < 210 && g > 95 && g < 215 && b > 105 && b < 225) {
        // Double check not white fuselage (fuselage is r>225) and not wheels (r<60)
        if (r < 220 && g < 220 && b < 230) {
          // If it looks like grey overcast cloud
          imgData[idx + 3] = 0;
        }
      }
    }
  }
}

const buffer = PNG.sync.write(png);
fs.writeFileSync('public/boeing747_real_clean.png', buffer);
console.log('Refined clean transparent image written to public/boeing747_real_clean.png');
