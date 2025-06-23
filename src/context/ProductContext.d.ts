import { ReactNode } from 'react';

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  origin: string;
  price_ugx: number;
  price_kes: number;
  image_url: string;
  stock: number;
  featured: boolean;
  created_at: string;
}

export interface ProductContextValue {
  products: Product[];
  featuredProducts: Product[];
  categories: string[];
  loading: boolean;
  fetchProducts: () => Promise<Product[]>;
  getProductById: (id: string) => Promise<Product | null>;
}

export declare function ProductProvider({ children }: { children: ReactNode }): JSX.Element;
export declare function useProducts(): ProductContextValue;
