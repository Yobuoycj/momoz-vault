/**
 * Application-wide type definitions
 */
export interface Product {
  id: string;
  title: string;
  category: string;
  image: string;
  origin: 'kenya' | 'uganda';
  priceUGX: number;
  priceKES: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type ApiResponse<T> = {
  data: T;
  error?: string;
  status: number;
};

export type NotificationType = 'success' | 'error' | 'info';