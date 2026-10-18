import rawClientData from '../data/client.json';

export interface ClientData {
  slug: string;
  name: string;
  activity: {
    type: string;
    label: string;
    pitch: string;
    differentiators: string[];
  };
  tier: number;
  modules: string[];
  locale: string;
  currency: string;
  timezone: string;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: {
      street: string;
      district: string;
      city: string;
      country: string;
    };
    geo: {
      lat: number;
      lng: number;
    };
    socials: {
      facebook?: string;
      instagram?: string;
      tiktok?: string;
    };
  };
  hours: Array<{
    days: string[];
    opens: string | null;
    closes: string | null;
  }>;
  booking: {
    mode: string;
    channel: string;
  };
  brand: {
    mood: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      surface: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
    logo: string;
    pattern: string;
    footerVariant: string;
  };
  services: Array<{
    slug: string;
    name: string;
    category: string;
    price: number;
    priceFrom?: boolean;
    duration?: number;
    description: string;
  }>;
  products: Array<{
    slug: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    description: string;
  }>;
  promotions: Array<any>;
  delivery: {
    enabled: boolean;
    zones: Array<{ name: string; fee: number }>;
    homeService: boolean;
  };
  payments: {
    wave: boolean;
    paydunya: boolean;
    whatsappOrder: boolean;
    cashOnDelivery: boolean;
  };
  primaryAction: string;
  seo: {
    city: string;
    keywords: string[];
    description: string;
  };
  analytics: {
    plausibleDomain: string;
  };
  features: {
    roleSimulator: boolean;
  };
  generated: {
    storageKey: string;
    demoDb: string;
  };
}

export const client: ClientData = rawClientData as unknown as ClientData;
