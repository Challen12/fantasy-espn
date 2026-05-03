import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_DIR = path.join(__dirname, '../csv');
const OUTPUT_FILE = path.join(__dirname, '../src/data/fantasy_history.json');

const PARTICIPANTS = [
  'JOSE', 'TOTTI', 'COLLERA', 'KELE', 'CHALLEN', 'JOTA', 'MUSTI', 'MARCOS', 
  'ILDKRAFT', 'IVÁN', 'RACRACK', 'ÁNGEL', 'CRISTIAN', 'JAVI', 'YERCA', 'MELKART', 'FOCHY'
];

// In-memory data model
const db = {
  participants: {},
  seasons: {}
};

// Initialize participants
PARTICIPANTS.forEach(p => {
  db.participants[p] = {
    name: p,
    globalRank: null,
    globalPoints: 0,
    championships: [],
    conferenceChampionships: [],
    mvps: [],
    mvpPlayoffs: [],
    jokicLeague: []
  };
});

// Helper to normalize and match names
function matchParticipant(name) {
  if (!name || name === '-') return null;
  name = name.trim().toUpperCase();
  if (name === 'JAVI ') name = 'JAVI'; // from CSV
  if (PARTICIPANTS.includes(name)) return name;
  return null; // or you might throw if invalid
}

// Ensure season exists
function ensureSeason(year) {
  if (!db.seasons[year]) {
    db.seasons[year] = {
      year,
      champion: null,
      conferenceA: null,
      conferenceB: null,
      mvp: null,
      mvpPlayoff: null,
      jokicLeague: null
    };
  }
}

function parseCSV(fileName, onRow) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(CSV_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${fileName}`);
      return resolve();
    }
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => onRow(data))
      .on('end', resolve)
      .on('error', reject);
  });
}

async function ingest() {
  // 1. Clasificacion Global
  await parseCSV('FANTASY-ESPN-CLASIFICACION-GLOBAL.csv', (row) => {
    let name = matchParticipant(row['NOMBRE']);
    if (name) {
      db.participants[name].globalRank = parseInt(row['POSICION'].replace('º', ''));
      db.participants[name].globalPoints = row['PUNTUACIÓN'] === '-' ? 0 : parseInt(row['PUNTUACIÓN']);
    }
  });

  // 2. Campeones
  await parseCSV('FANTASY-ESPN-CAMPEONES.csv', (row) => {
    let year = parseInt(row['AÑO']);
    let name = matchParticipant(row['GANADOR']);
    ensureSeason(year);
    if (name) {
      db.seasons[year].champion = name;
      db.participants[name].championships.push(year);
    }
  });

  // 3. Campeon de Conferencia
  await parseCSV('FANTASY-ESPN-CAMPEON-DE-CONFERENCIA.csv', (row) => {
    let year = parseInt(row['AÑO']);
    ensureSeason(year);
    
    let a = matchParticipant(row['GANADOR A']);
    let b = matchParticipant(row['GANADOR B']);
    
    if (a) {
      db.seasons[year].conferenceA = a;
      db.participants[a].conferenceChampionships.push(year);
    }
    if (b) {
      db.seasons[year].conferenceB = b;
      db.participants[b].conferenceChampionships.push(year);
    }
  });

  // 4. Jokic League
  await parseCSV('FANTASY-ESPN-JOKIC-LEAGUE.csv', (row) => {
    let year = parseInt(row['AÑO']);
    let name = matchParticipant(row['GANADOR']);
    ensureSeason(year);
    if (name) {
      db.seasons[year].jokicLeague = name;
      db.participants[name].jokicLeague.push(year);
    }
  });

  // 5. MVP
  await parseCSV('FANTASY-ESPN-MVP.csv', (row) => {
    let year = parseInt(row['AÑO']);
    let name = matchParticipant(row['GANADOR']);
    ensureSeason(year);
    if (name) {
      db.seasons[year].mvp = name;
      db.participants[name].mvps.push(year);
    }
  });

  // 6. MVP Playoff
  await parseCSV('FANTASY-ESPN-MVP-PLAYOFF.csv', (row) => {
    let year = parseInt(row['AÑO']);
    let name = matchParticipant(row['GANADOR']);
    ensureSeason(year);
    if (name) {
      db.seasons[year].mvpPlayoff = name;
      db.participants[name].mvpPlayoffs.push(year);
    }
  });

  // Write to output file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(db, null, 2));
  console.log('Ingestion completed! Data written to', OUTPUT_FILE);
}

ingest().catch(console.error);
