/**
 * Gestionnaire unique et sécurisé du LocalStorage pour l'application.
 * 
 * Règle d'or : UNE SEULE CLÉ par client `<slug>:app`, contenant un JSON versionné.
 * Zéro token d'auth, zéro données bancaires.
 */

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
}

export interface AppStorageData {
  v: number;
  cart: CartItem[];
  prefs: {
    theme: 'auto' | 'light' | 'dark';
  };
  sim: {
    role: 'public' | 'admin' | null;
  };
  consent: {
    analytics?: boolean;
    date?: string;
  };
}

const CURRENT_VERSION = 1;

const DEFAULT_STORAGE: AppStorageData = {
  v: CURRENT_VERSION,
  cart: [],
  prefs: {
    theme: 'auto'
  },
  sim: {
    role: null
  },
  consent: {}
};

/**
 * Récupère le nom de la clé de stockage propre au client.
 */
export function getStorageKey(slug?: string): string {
  const clientSlug = slug || import.meta.env.PUBLIC_CLIENT_SLUG || 'default';
  return `${clientSlug}:app`;
}

/**
 * Migration automatique des structures de stockage si la version change.
 */
function migrate(data: any): AppStorageData {
  if (!data || typeof data !== 'object') {
    return { ...DEFAULT_STORAGE };
  }

  // Version 1 (base)
  if (!data.v || data.v < 1) {
    data.v = 1;
    data.cart = Array.isArray(data.cart) ? data.cart : [];
    data.prefs = data.prefs || { theme: 'auto' };
    data.sim = data.sim || { role: null };
    data.consent = data.consent || {};
  }

  return data as AppStorageData;
}

/**
 * Lit l'état complet du stockage local.
 */
export function getStorage(slug?: string): AppStorageData {
  if (typeof window === 'undefined') {
    return { ...DEFAULT_STORAGE };
  }

  try {
    const raw = localStorage.getItem(getStorageKey(slug));
    if (!raw) return { ...DEFAULT_STORAGE };
    const parsed = JSON.parse(raw);
    return migrate(parsed);
  } catch (error) {
    console.warn('[Storage] Erreur de lecture localStorage :', error);
    return { ...DEFAULT_STORAGE };
  }
}

/**
 * Écrit l'état complet du stockage local.
 */
export function setStorage(data: AppStorageData, slug?: string): boolean {
  if (typeof window === 'undefined') return false;

  try {
    data.v = CURRENT_VERSION;
    localStorage.setItem(getStorageKey(slug), JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('app:storage:change', { detail: data }));
    return true;
  } catch (error) {
    console.error('[Storage] Impossible d\'écrire dans le localStorage (quota plein ou navigation privée) :', error);
    return false;
  }
}

/**
 * Met à jour une partie de l'état du stockage.
 */
export function updateStorage(
  updater: (prev: AppStorageData) => Partial<AppStorageData>,
  slug?: string
): AppStorageData {
  const current = getStorage(slug);
  const patch = updater(current);
  const updated: AppStorageData = {
    ...current,
    ...patch,
    v: CURRENT_VERSION
  };
  setStorage(updated, slug);
  return updated;
}
