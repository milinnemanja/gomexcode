
export interface Product {
  id: string;
  name: string;
  code: string;
  category?: string;
  createdAt: number;
}

export interface ExpiryItem {
  id: string;
  name: string;
  code?: string; // Šifra artikla za rokove
  expiryDate: string; // ISO format string
  category: string;
  createdAt: number;
}

export type ViewMode = 'home' | 'search' | 'dates' | 'admin';

export interface StorageData {
  products: Product[];
  expiryItems: ExpiryItem[];
}
