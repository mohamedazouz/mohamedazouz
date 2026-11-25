// Regenerates public/og.png (1200×630) and public/apple-touch-icon.png (180×180)
// from inline SVG using sharp (bundled with Astro). Run: bun run images
import sharp from 'sharp';
import { PERSON } from '../src/consts';

const BG = '#0F1113';
const TEXT = '#E6E4DF';
const MUTED = '#8B9096';
const RULE = '#24282C';
const ACCENT = '#3DD6A3';
const SANS = 'Helvetica Neue, Helvetica, Arial, sans-serif';
const MONO = 'Menlo, Monaco, Courier New, monospace';

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <text x="96" y="150" font-family="${MONO}" font-size="24" letter-spacing="3" fill="${ACCENT}">// MOHAMEDAZOUZ.COM</text>
  <text x="96" y="300" font-family="${SANS}" font-size="92" font-weight="700" fill="${TEXT}">${PERSON.name}<tspan fill="${ACCENT}" font-weight="400"> ▍</tspan></text>
  <text x="96" y="380" font-family="${SANS}" font-size="40" fill="${TEXT}">Engineering Leader · Senior Engineering Manager</text>
  <text x="96" y="436" font-family="${SANS}" font-size="34" fill="${MUTED}">Streaming platforms at scale · Agentic AI</text>
  <line x1="96" y1="510" x2="1104" y2="510" stroke="${RULE}" stroke-width="2"/>
  <text x="96" y="560" font-family="${MONO}" font-size="24" letter-spacing="2" fill="${MUTED}">LONDON, UK</text>
  <circle cx="1092" cy="552" r="9" fill="${ACCENT}"/>
</svg>`;

const icon = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="${BG}"/>
  <path fill="${ACCENT}" d="M7 23V9h3.2l5.8 8.2L21.8 9H25v14h-3v-9.2l-5 7h-.1l-5-7V23z"/>
</svg>`;

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile('public/og.png');
await sharp(Buffer.from(icon), { density: 450 }).resize(180, 180).png().toFile('public/apple-touch-icon.png');
console.log('Generated public/og.png and public/apple-touch-icon.png');
