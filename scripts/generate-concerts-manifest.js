// scripts/generate-concerts-manifest.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const concertsDir = path.join(__dirname, '../content/concerts');
const outputPath = path.join(__dirname, '../lib/concerts-manifest.json');

const LOCALES = ['de', 'en'];

const manifest = {};

const slugs = fs.readdirSync(concertsDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
  .map(entry => entry.name);

for (const slug of slugs) {
  manifest[slug] = {};
  for (const locale of LOCALES) {
    const filePath = path.join(concertsDir, slug, `${locale}.mdx`);
    if (!fs.existsSync(filePath)) continue;
    const { data } = matter(fs.readFileSync(filePath, 'utf8'));
    manifest[slug][locale] = {
      title: data.title,
      composers: data.composers,
      performances: data.performances || [],
      poster: data.poster,
      program: data.program,
    };
  }
}

fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
console.log(`Generated concerts manifest with ${Object.keys(manifest).length} concerts`);
