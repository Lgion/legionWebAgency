import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let client: MongoClient | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('[DB] Variable MONGODB_URI manquante dans l\'environnement');
  }

  if (!client) {
    client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    await client.connect();
    console.log('[DB] Connecté à MongoDB Atlas avec succès');
  }

  return client;
}

export async function getDb(isSimulation: boolean = false): Promise<Db> {
  const client = await getMongoClient();
  const baseDbName = process.env.MONGODB_DB || 'webagency_default';
  
  // Si le simulateur est actif, on cible impérativement la base préfixée demo_
  const dbName = isSimulation ? `demo_${baseDbName}` : baseDbName;
  return client.db(dbName);
}

// Collections types
export interface ServiceDoc {
  slug: string;
  name: string;
  category: string;
  price: number;
  priceFrom?: boolean;
  duration?: number;
  description: string;
  updatedAt: Date;
}

export interface ProductDoc {
  slug: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  updatedAt: Date;
}

export interface OrderDoc {
  orderId: string;
  items: Array<{
    slug: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  currency: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  delivery: {
    mode: 'pickup' | 'delivery';
    address?: string;
    notes?: string;
  };
  payment: {
    method: 'wave' | 'paydunya' | 'whatsapp' | 'cash';
    status: 'pending' | 'paid' | 'failed' | 'cancelled';
    reference?: string;
    paidAt?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactDoc {
  name: string;
  phone: string;
  email?: string;
  message: string;
  createdAt: Date;
}
