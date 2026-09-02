const fs = require('fs');
const { PNG } = require('pngjs');

const inputPath = 'C:/Users/saniy/.gemini/antigravity/brain/a393e457-c247-4224-a076-52aa32187b7f/.user_uploaded/media_1787507419595.png';
const data = fs.readFileSync(inputPath);

const png = PNG.sync.read(data);
console.log('Image dimensions:', png.width, 'x', png.height);

// Inspect edge colors (sky)
const corners = [
  [0, 0],
  [png.width - 1, 0],
  [0, png.height - 1],
  [png.width - 1, png.height - 1],
  [Math.floor(png.width / 2), 0],
  [Math.floor(png.width / 2), png.height - 1]
];

corners.forEach(([x, y]) => {
  const idx = (png.width * y + x) << 2;
  console.log(`Pixel at (${x},${y}): R=${png.data[idx]}, G=${png.data[idx+1]}, B=${png.data[idx+2]}, A=${png.data[idx+3]}`);
});
