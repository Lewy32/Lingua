/**
 * App Icon Generator Script
 * 
 * This script creates simple mascot icons for the app.
 * Run with: node scripts/generate-icons.js
 * 
 * Requires: sharp (npm install sharp)
 * 
 * The mascot is a simple orange circle with two white oval eyes.
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('Sharp not installed. Creating placeholder SVGs instead.');
  createSVGs();
  process.exit(0);
}

const ORANGE = '#FF6B35';
const DARK_BG = '#1a1a2e';
const WHITE = '#FFFFFF';

async function generateIcon(size, outputPath, withBackground = true) {
  const padding = Math.floor(size * 0.1);
  const circleSize = size - (padding * 2);
  const circleRadius = circleSize / 2;
  const center = size / 2;
  
  // Eye dimensions
  const eyeWidth = circleSize * 0.12;
  const eyeHeight = circleSize * 0.18;
  const eyeGap = circleSize * 0.15;
  const eyeY = center - circleSize * 0.05;
  
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      ${withBackground ? `<rect width="${size}" height="${size}" fill="${DARK_BG}"/>` : ''}
      <circle cx="${center}" cy="${center}" r="${circleRadius}" fill="${ORANGE}"/>
      <ellipse cx="${center - eyeGap}" cy="${eyeY}" rx="${eyeWidth/2}" ry="${eyeHeight/2}" fill="${WHITE}"/>
      <ellipse cx="${center + eyeGap}" cy="${eyeY}" rx="${eyeWidth/2}" ry="${eyeHeight/2}" fill="${WHITE}"/>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);
  
  console.log(`Created: ${outputPath}`);
}

async function generateSplash(width, height, outputPath) {
  const size = Math.min(width, height) * 0.3;
  const center = { x: width / 2, y: height / 2 };
  const circleRadius = size / 2;
  
  // Eye dimensions
  const eyeWidth = size * 0.12;
  const eyeHeight = size * 0.18;
  const eyeGap = size * 0.15;
  const eyeY = center.y - size * 0.05;
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${DARK_BG}"/>
      <circle cx="${center.x}" cy="${center.y}" r="${circleRadius}" fill="${ORANGE}"/>
      <ellipse cx="${center.x - eyeGap}" cy="${eyeY}" rx="${eyeWidth/2}" ry="${eyeHeight/2}" fill="${WHITE}"/>
      <ellipse cx="${center.x + eyeGap}" cy="${eyeY}" rx="${eyeWidth/2}" ry="${eyeHeight/2}" fill="${WHITE}"/>
      <text x="${center.x}" y="${center.y + size/2 + 60}" 
            font-family="Arial, sans-serif" 
            font-size="48" 
            font-weight="bold"
            fill="${WHITE}" 
            text-anchor="middle">Farsi Learning</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);
  
  console.log(`Created: ${outputPath}`);
}

async function main() {
  const assetsDir = path.join(__dirname, '..', 'assets');
  
  // Ensure assets directory exists
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Generate icons
  await generateIcon(1024, path.join(assetsDir, 'icon.png'), true);
  await generateIcon(1024, path.join(assetsDir, 'adaptive-icon.png'), false);
  await generateSplash(1284, 2778, path.join(assetsDir, 'splash.png'));
  
  console.log('\\nAll icons generated successfully!');
}

function createSVGs() {
  const assetsDir = path.join(__dirname, '..', 'assets');
  
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Create simple SVG files as placeholders
  const iconSvg = `<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
    <rect width="1024" height="1024" fill="#1a1a2e"/>
    <circle cx="512" cy="512" r="400" fill="#FF6B35"/>
    <ellipse cx="420" cy="480" rx="50" ry="70" fill="#FFFFFF"/>
    <ellipse cx="604" cy="480" rx="50" ry="70" fill="#FFFFFF"/>
  </svg>`;

  fs.writeFileSync(path.join(assetsDir, 'icon.svg'), iconSvg);
  console.log('Created: assets/icon.svg');
  console.log('\\nNote: Convert SVGs to PNGs using an online converter or install sharp.');
}

main().catch(console.error);
