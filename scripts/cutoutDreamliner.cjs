const fs = require('fs');
const jpeg = require('jpeg-js');
const { PNG } = require('pngjs');

const inputJpg = 'C:/Users/saniy/.gemini/antigravity/brain/a393e457-c247-4224-a076-52aa32187b7f/realistic_airliner_1787508873180.jpg';
const rawData = fs.readFileSync(inputJpg);
const decoded = jpeg.decode(rawData, { useTArray: true });

const width = decoded.width;
const height = decoded.height;
const data = decoded.data; // RGBA buffer

console.log('Decoded dimensions:', width, 'x', height);

const png = new PNG({ width, height });
const outData = png.data;

// Flood fill from outer perimeter to remove the white studio background
// Background is pure white/light grey studio floor (R > 240, G > 240, B > 240 with low diff)
const visited = new Uint8Array(width * height);
const isBg = new Uint8Array(width * height);
const queue = [];

function isBackground(r, g, b) {
  // Pure white/off-white background
  if (r >= 238 && g >= 238 && b >= 238) return true;
  // Floor shadow (neutral light grey under tires: r,g,b in [210, 245], diff < 10)
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (min >= 215 && max - min <= 8) return true;
  return false;
}

// Push all boundary pixels
for (let x = 0; x < width; x++) {
  queue.push(x, 0);
  queue.push(x, height - 1);
}
for (let y = 0; y < height; y++) {
  queue.push(0, y);
  queue.push(width - 1, y);
}

let head = 0;
while (head < queue.length) {
  const x = queue[head++];
  const y = queue[head++];
  const idx = y * width + x;

  if (visited[idx]) continue;
  visited[idx] = 1;

  const p = idx << 2;
  const r = data[p];
  const g = data[p + 1];
  const b = data[p + 2];

  if (isBackground(r, g, b)) {
    isBg[idx] = 1;

    if (x > 0 && !visited[idx - 1]) queue.push(x - 1, y);
    if (x < width - 1 && !visited[idx + 1]) queue.push(x + 1, y);
    if (y > 0 && !visited[idx - width]) queue.push(x, y - 1);
    if (y < height - 1 && !visited[idx + width]) queue.push(x, y + 1);
  }
}

// Copy pixels to PNG with soft anti-aliased edges
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = y * width + x;
    const p = idx << 2;

    if (isBg[idx]) {
      outData[p] = 0;
      outData[p + 1] = 0;
      outData[p + 2] = 0;
      outData[p + 3] = 0; // Transparent
    } else {
      outData[p] = data[p];
      outData[p + 1] = data[p + 1];
      outData[p + 2] = data[p + 2];

      // Anti-aliased border
      let bgNeighbors = 0;
      if (x > 0 && isBg[idx - 1]) bgNeighbors++;
      if (x < width - 1 && isBg[idx + 1]) bgNeighbors++;
      if (y > 0 && isBg[idx - width]) bgNeighbors++;
      if (y < height - 1 && isBg[idx + width]) bgNeighbors++;

      if (bgNeighbors > 0) {
        outData[p + 3] = Math.max(0, Math.floor(255 - bgNeighbors * 35));
      } else {
        outData[p + 3] = 255;
      }
    }
  }
}

const buffer = PNG.sync.write(png);
fs.writeFileSync('public/realistic_airliner_transparent.png', buffer);
console.log('Saved to public/realistic_airliner_transparent.png! Size:', buffer.length);
