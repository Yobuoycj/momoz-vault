import { ReactNode } from 'react';

export interface CurrencyContextValue {
  currency: 'UGX' | 'KES';
  setCurrency: (currency: 'UGX' | 'KES') => void;
}

export declare function CurrencyProvider({ children }: { children: ReactNode }): JSX.Element;
export declare function useCurrency(): CurrencyContextValue;