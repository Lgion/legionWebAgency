import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runSeed() {
  const isDemo = process.argv.includes('--demo');
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ Erreur : MONGODB_URI non définie dans api/.env');
    process.exit(1);
  }

  // Résolution du fichier de données client
  const clientJsonPath = path.resolve(__dirname, '../../site/src/data/client.json');
  const fallbackJsonPath = path.resolve(__dirname, '../../client.example.json');

  const targetPath = fs.existsSync(clientJsonPath) ? clientJsonPath : fallbackJsonPath;
  const rawData = fs.readFileSync(targetPath, 'utf-8');
  const clientData = JSON.parse(rawData);

  const baseDbName = clientData.slug || process.env.MONGODB_DB || 'webagency_client';
  const targetDbName = isDemo ? `demo_${baseDbName}` : baseDbName;

  console.log(`\n🌱 Démarrage du Seeding MongoDB`);
  console.log(`📁 Source des données : ${targetPath}`);
  console.log(`🎯 Base ciblée        : ${targetDbName} ${isDemo ? '(MODE SIMULATION DEMO)' : '(PRODUCTION CLIENT)'}`);

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(targetDbName);

    // 1. Paramètres généraux (Settings)
    await db.collection('settings').updateOne(
      { key: 'general' },
      {
        $set: {
          key: 'general',
          name: clientData.name,
          slug: clientData.slug,
          activity: clientData.activity,
          contact: clientData.contact,
          hours: clientData.hours,
          brand: clientData.brand,
          delivery: clientData.delivery,
          payments: clientData.payments,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );
    console.log(`  ✓ Collection 'settings' synchronisée`);

    // 2. Prestations (Services)
    const servicesCollection = db.collection('services');
    await servicesCollection.createIndex({ slug: 1 }, { unique: true });

    let servicesCount = 0;
    if (Array.isArray(clientData.services)) {
      for (const service of clientData.services) {
        await servicesCollection.updateOne(
          { slug: service.slug },
          {
            $set: {
              ...service,
              updatedAt: new Date()
            }
          },
          { upsert: true }
        );
        servicesCount++;
      }
    }
    console.log(`  ✓ ${servicesCount} prestation(s) synchronisée(s) dans 'services'`);

    // 3. Produits (Products)
    const productsCollection = db.collection('products');
    await productsCollection.createIndex({ slug: 1 }, { unique: true });

    let productsCount = 0;
    if (Array.isArray(clientData.products)) {
      for (const product of clientData.products) {
        await productsCollection.updateOne(
          { slug: product.slug },
          {
            $set: {
              ...product,
              updatedAt: new Date()
            }
          },
          { upsert: true }
        );
        productsCount++;
      }
    }
    console.log(`  ✓ ${productsCount} produit(s) synchronisé(s) dans 'products'`);

    // 4. Index sur les commandes (Orders)
    await db.collection('orders').createIndex({ orderId: 1 }, { unique: true });
    await db.collection('orders').createIndex({ createdAt: -1 });
    console.log(`  ✓ Index de commandes configurés`);

    console.log(`\n🎉 Seeding terminé avec succès pour ${targetDbName} !\n`);
  } catch (err) {
    console.error('❌ Échec du seeding :', err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

runSeed();
