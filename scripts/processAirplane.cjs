const fs = require('fs');
const { PNG } = require('pngjs');

const inputPath = 'C:/Users/saniy/.gemini/antigravity/brain/a393e457-c247-4224-a076-52aa32187b7f/.user_uploaded/media_1787507419595.png';
const data = fs.readFileSync(inputPath);
const png = PNG.sync.read(data);

const width = png.width;
const height = png.height;
const imgData = png.data;

// We will use breadth-first search flood fill from all perimeter boundaries
// A pixel is sky if it is reachable from the border and its color is cloudy sky.
// To ensure we don't bleed into the white fuselage or dark gear, let's define sky criteria:
// Fuselage is white (brightness > 220)
// Tail is teal (G - R > 40 or B - R > 50 with dark R)
// Dark parts: R < 60, G < 60, B < 60
// Sky has: B >= G - 5, B >= R + 3, and brightness between 75 and 225

const visited = new Uint8Array(width * height);
const isSky = new Uint8Array(width * height);
const queue = [];

function isSkyColor(r, g, b) {
  // Pure white fuselage check
  if (r > 215 && g > 215 && b > 215) return false;
  // Dark components (landing gear, engines, shadows, windows)
  if (r < 65 && g < 65 && b < 65) return false;
  // Teal tail check (Air New Zealand teal has distinct high green/blue relative to red)
  if (g > r + 35 && b > r + 35) return false;
  // Deep navy blue lettering
  if (b > r + 40 && b < 140 && r < 50) return false;

  // Sky characteristic: overcast grey-blue clouds
  // (r, g, b are within [80, 215], with b >= r and b >= g - 10)
  if (r >= 70 && r <= 220 && g >= 75 && g <= 225 && b >= 85 && b <= 235) {
    // Difference between max and min is relatively small (grey/clouds)
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max - min < 45) {
      return true;
    }
  }
  return false;
}

// Add all border pixels
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
  const r = imgData[p];
  const g = imgData[p + 1];
  const b = imgData[p + 2];

  if (isSkyColor(r, g, b)) {
    isSky[idx] = 1;

    // Expand to 4 neighbors
    if (x > 0 && !visited[idx - 1]) queue.push(x - 1, y);
    if (x < width - 1 && !visited[idx + 1]) queue.push(x + 1, y);
    if (y > 0 && !visited[idx - width]) queue.push(x, y - 1);
    if (y < height - 1 && !visited[idx + width]) queue.push(x, y + 1);
  }
}

// Apply transparency to sky pixels with edge feathering / anti-aliasing
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = y * width + x;
    const p = idx << 2;

    if (isSky[idx]) {
      imgData[p + 3] = 0; // completely transparent
    } else {
      // Check if adjacent to sky for subtle anti-aliasing
      let skyNeighbors = 0;
      if (x > 0 && isSky[idx - 1]) skyNeighbors++;
      if (x < width - 1 && isSky[idx + 1]) skyNeighbors++;
      if (y > 0 && isSky[idx - width]) skyNeighbors++;
      if (y < height - 1 && isSky[idx + width]) skyNeighbors++;

      if (skyNeighbors > 0) {
        // Soft edge
        imgData[p + 3] = Math.min(255, Math.floor(255 - skyNeighbors * 30));
      }
    }
  }
}

const buffer = PNG.sync.write(png);
fs.writeFileSync('public/boeing747_real_transparent.png', buffer);
console.log('Successfully generated public/boeing747_real_transparent.png!');
console.log('Size:', buffer.length, 'bytes');
