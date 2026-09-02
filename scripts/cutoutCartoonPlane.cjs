const fs = require('fs');
const jpeg = require('jpeg-js');
const { PNG } = require('pngjs');

const inputJpg = 'C:/Users/saniy/.gemini/antigravity/brain/a393e457-c247-4224-a076-52aa32187b7f/cartoon_airplane_bank_1787509170446.jpg';
const rawData = fs.readFileSync(inputJpg);
const decoded = jpeg.decode(rawData, { useTArray: true });

const width = decoded.width;
const height = decoded.height;
const data = decoded.data;

console.log('Decoded dimensions:', width, 'x', height);

const png = new PNG({ width, height });
const outData = png.data;

const visited = new Uint8Array(width * height);
const isBg = new Uint8Array(width * height);
const queue = [];

function isBackground(r, g, b) {
  // Pure flat white background
  if (r >= 242 && g >= 242 && b >= 242) return true;
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

// Anti-aliasing edge copy
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
fs.writeFileSync('public/cartoon_plane_transparent.png', buffer);
console.log('Successfully saved to public/cartoon_plane_transparent.png! Size:', buffer.length);
