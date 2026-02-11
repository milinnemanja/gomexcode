
export interface Product {
  id: string;
  name: string;
  code: string;
  category?: string;
  createdAt: number;
}

export type ViewMode = 'home' | 'search' | 'admin';

export interface StorageData {
  products: Product[];
}
