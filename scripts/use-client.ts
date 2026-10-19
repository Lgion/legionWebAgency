#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const clientsDir = path.resolve(rootDir, 'clients');
const siteDataDir = path.resolve(rootDir, 'site/src/data');
const siteEnvPath = path.resolve(rootDir, 'site/.env');

const args = process.argv.slice(2);
const slugArg = args[0];

if (!slugArg) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔄 WebAgency CLI — Changement de Client Actif');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('Usage : npm run client:use <nom-du-dossier-client>');
  
  if (fs.existsSync(clientsDir)) {
    const available = fs.readdirSync(clientsDir).filter(f => {
      const full = path.join(clientsDir, f);
      return fs.statSync(full).isDirectory() && fs.existsSync(path.join(full, 'client.json'));
    });
    console.log('\nClients disponibles dans `clients/` :');
    available.forEach(c => console.log(`  - ${c}`));
  }
  console.log('');
  process.exit(1);
}

// Recherche du client dans clients/
const clientPath = path.resolve(clientsDir, slugArg, 'client.json');

if (!fs.existsSync(clientPath)) {
  console.error(`❌ Erreur : Dossier client introuvable : ${clientPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(clientPath, 'utf-8');
const clientData = JSON.parse(raw);

// Copie vers site/src/data/client.json
fs.writeFileSync(path.resolve(siteDataDir, 'client.json'), raw, 'utf-8');

// Mise à jour de site/.env
const siteEnvContent = `PUBLIC_CLIENT_SLUG=${clientData.slug || slugArg}
PUBLIC_API_URL=http://localhost:3000
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_ROLE_SIMULATOR=true
`;
fs.writeFileSync(siteEnvPath, siteEnvContent, 'utf-8');

console.log(`✅ Client actif basculé sur : "${clientData.name || slugArg}"`);
console.log(`   - Fichier synchronisé : site/src/data/client.json`);
console.log(`   - Slug actif          : ${clientData.slug || slugArg}`);
console.log('\nRelancez votre serveur : npm run dev\n');
