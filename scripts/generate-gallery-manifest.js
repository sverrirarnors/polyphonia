// scripts/generate-gallery-manifest.js
const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, '../public/images/gallery');
const outputPath = path.join(__dirname, '../lib/gallery-manifest.json');

const manifest = {};

if (!fs.existsSync(galleryDir)) {
  console.log('No local gallery directory found; keeping the checked-in fallback manifest');
  process.exit(0);
}

// Read all concert folders
const concerts = fs.readdirSync(galleryDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name);

for (const concert of concerts) {
  const concertDir = path.join(galleryDir, concert);
  const images = fs.readdirSync(concertDir)
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort()
    .map(file => `/images/gallery/${concert}/${file}`);

  if (images.length > 0) {
    manifest[concert] = images;
  }
}

fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
console.log(`Generated gallery manifest with ${Object.keys(manifest).length} concerts`);
