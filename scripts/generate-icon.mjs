import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SIZE = 1024;

const svg = `
<svg width="${SIZE}" height="${SIZE}" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad" cx="40%" cy="35%" r="70%">
      <stop offset="0%" stop-color="#7A4A3F"/>
      <stop offset="100%" stop-color="#3C1E14"/>
    </radialGradient>
    <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FAF6F1" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="#FAF6F1" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1024" height="1024" fill="url(#bgGrad)" rx="0"/>

  <!-- Subtle center glow -->
  <ellipse cx="512" cy="480" rx="380" ry="340" fill="url(#glowGrad)"/>

  <!-- Outer ring -->
  <circle cx="512" cy="490" r="340" fill="none" stroke="#FAF6F1" stroke-opacity="0.12" stroke-width="1"/>

  <!-- Inner ring -->
  <circle cx="512" cy="490" r="295" fill="none" stroke="#FAF6F1" stroke-opacity="0.08" stroke-width="1"/>

  <!-- Top sprig branch left -->
  <g opacity="0.55" stroke="#FAF6F1" fill="none" stroke-linecap="round">
    <path d="M512 260 Q480 245 452 252" stroke-width="1.2"/>
    <path d="M490 253 Q478 238 465 240" stroke-width="1"/>
    <path d="M472 254 Q462 242 450 247" stroke-width="1"/>
    <!-- small leaves left -->
    <ellipse cx="453" cy="252" rx="9" ry="5" fill="#FAF6F1" fill-opacity="0.45" transform="rotate(-30 453 252)" stroke="none"/>
    <ellipse cx="466" cy="240" rx="8" ry="4.5" fill="#FAF6F1" fill-opacity="0.38" transform="rotate(-45 466 240)" stroke="none"/>
    <ellipse cx="451" cy="247" rx="8" ry="4" fill="#FAF6F1" fill-opacity="0.35" transform="rotate(-20 451 247)" stroke="none"/>
  </g>

  <!-- Top sprig branch right -->
  <g opacity="0.55" stroke="#FAF6F1" fill="none" stroke-linecap="round">
    <path d="M512 260 Q544 245 572 252" stroke-width="1.2"/>
    <path d="M534 253 Q546 238 559 240" stroke-width="1"/>
    <path d="M552 254 Q562 242 574 247" stroke-width="1"/>
    <!-- small leaves right -->
    <ellipse cx="571" cy="252" rx="9" ry="5" fill="#FAF6F1" fill-opacity="0.45" transform="rotate(30 571 252)" stroke="none"/>
    <ellipse cx="558" cy="240" rx="8" ry="4.5" fill="#FAF6F1" fill-opacity="0.38" transform="rotate(45 558 240)" stroke="none"/>
    <ellipse cx="573" cy="247" rx="8" ry="4" fill="#FAF6F1" fill-opacity="0.35" transform="rotate(20 573 247)" stroke="none"/>
  </g>

  <!-- Thin horizontal rule below sprig -->
  <line x1="350" y1="278" x2="674" y2="278" stroke="#FAF6F1" stroke-opacity="0.2" stroke-width="0.8"/>

  <!-- Y letterform -->
  <text
    x="366"
    y="570"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="280"
    font-style="italic"
    font-weight="400"
    fill="#FAF6F1"
    fill-opacity="0.95"
    letter-spacing="-8">Y</text>

  <!-- ampersand -->
  <text
    x="496"
    y="530"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="130"
    font-style="italic"
    font-weight="400"
    fill="#FAF6F1"
    fill-opacity="0.55">&#38;</text>

  <!-- V letterform -->
  <text
    x="574"
    y="570"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="280"
    font-style="italic"
    font-weight="400"
    fill="#FAF6F1"
    fill-opacity="0.95"
    letter-spacing="-8">V</text>

  <!-- Thin horizontal rule above date -->
  <line x1="350" y1="608" x2="674" y2="608" stroke="#FAF6F1" stroke-opacity="0.2" stroke-width="0.8"/>

  <!-- Date text -->
  <text
    x="512"
    y="648"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="36"
    font-weight="400"
    fill="#FAF6F1"
    fill-opacity="0.55"
    text-anchor="middle"
    letter-spacing="6">12 · 05 · 26</text>

  <!-- Bottom sprig left -->
  <g opacity="0.45" stroke="#FAF6F1" fill="none" stroke-linecap="round">
    <path d="M512 672 Q480 685 455 678" stroke-width="1.2"/>
    <path d="M487 680 Q472 694 458 690" stroke-width="1"/>
    <ellipse cx="456" cy="678" rx="9" ry="5" fill="#FAF6F1" fill-opacity="0.4" transform="rotate(25 456 678)" stroke="none"/>
    <ellipse cx="459" cy="690" rx="8" ry="4" fill="#FAF6F1" fill-opacity="0.32" transform="rotate(10 459 690)" stroke="none"/>
  </g>

  <!-- Bottom sprig right -->
  <g opacity="0.45" stroke="#FAF6F1" fill="none" stroke-linecap="round">
    <path d="M512 672 Q544 685 569 678" stroke-width="1.2"/>
    <path d="M537 680 Q552 694 566 690" stroke-width="1"/>
    <ellipse cx="568" cy="678" rx="9" ry="5" fill="#FAF6F1" fill-opacity="0.4" transform="rotate(-25 568 678)" stroke="none"/>
    <ellipse cx="565" cy="690" rx="8" ry="4" fill="#FAF6F1" fill-opacity="0.32" transform="rotate(-10 565 690)" stroke="none"/>
  </g>

  <!-- OUR DAY wordmark -->
  <text
    x="512"
    y="730"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="28"
    font-weight="400"
    fill="#FAF6F1"
    fill-opacity="0.38"
    text-anchor="middle"
    letter-spacing="10">OUR DAY</text>
</svg>
`;

async function generate() {
  const buf = Buffer.from(svg);

  // Main icon 1024x1024
  await sharp(buf)
    .resize(SIZE, SIZE)
    .png()
    .toFile(join(__dirname, '../assets/icon.png'));
  console.log('✓ assets/icon.png');

  // Splash icon (contain-mode, centered on cream bg) — 512x512 centered on 1242x2688
  await sharp(buf)
    .resize(512, 512)
    .png()
    .toFile(join(__dirname, '../assets/splash-icon.png'));
  console.log('✓ assets/splash-icon.png');

  // Android adaptive foreground (safe zone = center 66%)
  await sharp(buf)
    .resize(SIZE, SIZE)
    .png()
    .toFile(join(__dirname, '../assets/adaptive-icon.png'));
  console.log('✓ assets/adaptive-icon.png');

  // Favicon 48x48
  await sharp(buf)
    .resize(48, 48)
    .png()
    .toFile(join(__dirname, '../assets/favicon.png'));
  console.log('✓ assets/favicon.png');
}

generate().catch(console.error);
