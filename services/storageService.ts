
import { Product, ExpiryItem } from '../types';

const STORAGE_KEY = 'supermarket_plu_data';
const EXPIRY_KEY = 'supermarket_expiry_data';

const DEFAULT_PRODUCTS: Product[] = [];
const DEFAULT_EXPIRY: ExpiryItem[] = [];

export const storageService = {
  // Products
  getProducts: (): Product[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_PRODUCTS;
    }
  },

  saveProducts: (products: Product[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  },

  addProduct: (name: string, code: string, category?: string): Product => {
    const products = storageService.getProducts();
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name,
      code,
      category: category || 'Voće',
      createdAt: Date.now(),
    };
    const updated = [newProduct, ...products];
    storageService.saveProducts(updated);
    return newProduct;
  },

  deleteProduct: (id: string): void => {
    const products = storageService.getProducts();
    const updated = products.filter(p => p.id !== id);
    storageService.saveProducts(updated);
  },

  // Expiry Items
  getExpiryItems: (): ExpiryItem[] => {
    const data = localStorage.getItem(EXPIRY_KEY);
    if (!data) {
      localStorage.setItem(EXPIRY_KEY, JSON.stringify(DEFAULT_EXPIRY));
      return DEFAULT_EXPIRY;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_EXPIRY;
    }
  },

  saveExpiryItems: (items: ExpiryItem[]): void => {
    localStorage.setItem(EXPIRY_KEY, JSON.stringify(items));
  },

  addExpiryItem: (name: string, code: string, expiryDate: string, category: string): ExpiryItem => {
    const items = storageService.getExpiryItems();
    const newItem: ExpiryItem = {
      id: crypto.randomUUID(),
      name,
      code,
      expiryDate,
      category,
      createdAt: Date.now(),
    };
    const updated = [newItem, ...items].sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());
    storageService.saveExpiryItems(updated);
    return newItem;
  },

  deleteExpiryItem: (id: string): void => {
    const items = storageService.getExpiryItems();
    const updated = items.filter(i => i.id !== id);
    storageService.saveExpiryItems(updated);
  }
};
