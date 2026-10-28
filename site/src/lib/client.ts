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
    gallery?: Array<{
      src: string;
      alt: string;
      caption?: string;
    }>;
  };
  services: Array<{
    slug: string;
    name: string;
    category: string;
    price: number;
    priceFrom?: boolean;
    priceLabel?: string;
    duration?: number;
    image?: string;
    highlights?: string[];
    description: string;
  }>;
  products: Array<{
    slug: string;
    name: string;
    category: string;
    price: number;
    priceLabel?: string;
    stock: number;
    image?: string;
    badge?: string;
    description: string;
  }>;
  promotions: Array<{
    title: string;
    badge?: string;
    description: string;
    ctaText?: string;
  }>;
  actionHub?: {
    eyebrow?: string;
    title: string;
    subtitle: string;
    cards: Array<{
      id: string;
      icon: string;
      badge: string;
      title: string;
      description: string;
      bullets: string[];
      ctaLabel: string;
      whatsappMessage: string;
    }>;
  };
  seasonal?: {
    eyebrow?: string;
    title: string;
    subtitle: string;
    bannerText?: string;
    items: Array<{
      slug: string;
      name: string;
      seasonTag: string;
      price: number;
      priceFrom?: boolean;
      image?: string;
      description: string;
    }>;
  };
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
