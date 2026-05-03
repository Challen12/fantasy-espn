import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AVATAR_DIR = path.join(__dirname, '../public/avatars');

const PARTICIPANTS = [
  'JOSE', 'TOTTI', 'COLLERA', 'KELE', 'CHALLEN', 'JOTA', 'MUSTI', 'MARCOS', 
  'ILDKRAFT', 'IVÁN', 'RACRACK', 'ÁNGEL', 'CRISTIAN', 'JAVI', 'YERCA', 'MELKART', 'FOCHY'
];

if (!fs.existsSync(AVATAR_DIR)) {
  fs.mkdirSync(AVATAR_DIR, { recursive: true });
}

// Neon Gold & Green palette logic to distribute randomly or based on name
const colors = [
  '#ccff00', // Neon green
  '#d4af37', // Gold
  '#c4c9ac', // Pale
  '#e9c349', // Bright gold
  '#abd600'  // Lime green
];

PARTICIPANTS.forEach((name, index) => {
  const letters = name.substring(0, 2).toUpperCase();
  const color = colors[index % colors.length];
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="#1c1b1b" rx="20"/>
    <circle cx="100" cy="100" r="85" fill="#0a0a0a" stroke="${color}" stroke-width="4"/>
    <text x="50%" y="54%" font-family="Inter, system-ui, sans-serif" font-weight="800" font-size="70" fill="${color}" text-anchor="middle" dominant-baseline="middle" letter-spacing="2">${letters}</text>
  </svg>`;

  fs.writeFileSync(path.join(AVATAR_DIR, `${name}.svg`), svg);
});

console.log('Avatares generados exitosamente en public/avatars/');
