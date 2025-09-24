import { readdir } from 'fs/promises';
import { createCanvas, loadImage } from 'canvas';
import { writeFileSync } from 'fs';
import { join } from 'path';

const DRAWING_DIR = './static/common/assets/drawing';

const SIZES = [
  { name: 'desktop', width: 1920, height: 1080, imageSize: 120, padding: 15 },
  { name: 'tablet', width: 1024, height: 768, imageSize: 80, padding: 10 },
  { name: 'mobile', width: 768, height: 1024, imageSize: 60, padding: 8 }
];

async function createCollage(size) {
  const drawingFiles = await readdir(DRAWING_DIR);
  
  const imageFiles = drawingFiles.filter(f => 
    f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg')
  ).filter(f => !f.startsWith('collage-background')).map(f => ({ path: join(DRAWING_DIR, f), file: f }));

  const canvas = createCanvas(size.width, size.height);
  const ctx = canvas.getContext('2d');

  // White background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, size.width, size.height);

  // Calculate grid
  const cols = Math.floor(size.width / (size.imageSize + size.padding));

  // Load and place images
  for (let i = 0; i < imageFiles.length; i++) {
    const { path } = imageFiles[i];
    const img = await loadImage(path);
    
    const col = i % cols;
    const row = Math.floor(i / cols);
    
    const x = col * (size.imageSize + size.padding) + size.padding;
    const y = row * (size.imageSize + size.padding) + size.padding;
    
    // Calculate scaling to fit in IMAGE_SIZE box while maintaining aspect ratio
    const scale = Math.min(size.imageSize / img.width, size.imageSize / img.height);
    const width = img.width * scale;
    const height = img.height * scale;
    
    // Center image in its cell
    const offsetX = (size.imageSize - width) / 2;
    const offsetY = (size.imageSize - height) / 2;
    
    ctx.globalAlpha = 0.3; // Make images semi-transparent for background
    ctx.drawImage(img, x + offsetX, y + offsetY, width, height);
  }

  // Save
  const outputPath = `./static/common/assets/drawing/collage-background-${size.name}.png`;
  const buffer = canvas.toBuffer('image/png');
  writeFileSync(outputPath, buffer);
  console.log(`✅ Collage created at ${outputPath}`);
  console.log(`   Images used: ${imageFiles.length}`);
  console.log(`   Canvas size: ${size.width}x${size.height}`);
}

async function createAllCollages() {
  for (const size of SIZES) {
    await createCollage(size);
  }
}

createAllCollages().catch(console.error);