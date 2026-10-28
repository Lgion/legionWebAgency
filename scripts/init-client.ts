#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const siteDataDir = path.resolve(rootDir, 'site/src/data');
const exampleJsonPath = path.resolve(rootDir, 'client.example.json');
const targetClientJsonPath = path.resolve(siteDataDir, 'client.json');

const args = process.argv.slice(2);
const slugArg = args[0];

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🚀 WebAgency CLI — Initialisation Rapide de Client (< 30 min)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (!slugArg) {
  console.log('Usage : npm run init:client <slug>');
  console.log('Exemple : npm run init:client salon-babi-coiffure\n');
  process.exit(1);
}

const cleanSlug = slugArg.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/(^-|-$)/g, '');

console.log(`📌 Slug client ciblé : "${cleanSlug}"`);

// 1. Lecture du modèle
if (!fs.existsSync(exampleJsonPath)) {
  console.error(`❌ Erreur : Fichier modèle introuvable : ${exampleJsonPath}`);
  process.exit(1);
}

const rawTemplate = fs.readFileSync(exampleJsonPath, 'utf-8');
const clientConfig = JSON.parse(rawTemplate);

// 2. Remplacement et calcul des champs automatiques
clientConfig.slug = cleanSlug;
clientConfig.name = cleanSlug
  .split('-')
  .map(w => w.charAt(0).toUpperCase() + w.slice(1))
  .join(' ');

clientConfig.generated = {
  storageKey: `${cleanSlug}:app`,
  demoDb: `demo_${cleanSlug}`
};

// Si le dossier site/src/data n'existe pas, on le crée
if (!fs.existsSync(siteDataDir)) {
  fs.mkdirSync(siteDataDir, { recursive: true });
}

// 3. Écriture du nouveau client.json actif et sauvegarde dans clients/
fs.writeFileSync(targetClientJsonPath, JSON.stringify(clientConfig, null, 2), 'utf-8');

const clientFolder = path.resolve(rootDir, 'clients', slugArg);
if (!fs.existsSync(clientFolder)) {
  fs.mkdirSync(clientFolder, { recursive: true });
}
fs.writeFileSync(path.resolve(clientFolder, 'client.json'), JSON.stringify(clientConfig, null, 2), 'utf-8');

console.log(`✅ Fichier généré : site/src/data/client.json`);
console.log(`📁 Fichier archivé: clients/${slugArg}/client.json`);
console.log(`   - Nom du commerce   : "${clientConfig.name}"`);
console.log(`   - Clé LocalStorage  : "${clientConfig.generated.storageKey}"`);
console.log(`   - Base MongoDB Démo : "${clientConfig.generated.demoDb}"`);

// 4. Mise à jour de .env site & api
const siteEnvPath = path.resolve(rootDir, 'site/.env');
const apiEnvPath = path.resolve(rootDir, 'api/.env');

const siteEnvContent = `PUBLIC_CLIENT_SLUG=${cleanSlug}
PUBLIC_API_URL=http://localhost:3000
PUBLIC_SITE_URL=https://localhost:4321
PUBLIC_ROLE_SIMULATOR=true
`;

fs.writeFileSync(siteEnvPath, siteEnvContent, 'utf-8');
console.log(`✅ Variables d'environnement configurées : site/.env`);

// 5. Instruction pour la suite
console.log('\n✨ Initialisation terminée avec succès !');
console.log('\nÉtapes suivantes pour finaliser le déploiement :');
console.log('  1. Remplissez les prestations et contacts réels dans `site/src/data/client.json`');
console.log('  2. Lancez le seeding de test : npm run seed:demo');
console.log('  3. Lancez le serveur de développement : npm run dev\n');
