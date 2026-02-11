
import { Product } from '../types';

const STORAGE_KEY = 'supermarket_plu_data';

const DEFAULT_PRODUCTS: Product[] = [];

export const storageService = {
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
  }
};
