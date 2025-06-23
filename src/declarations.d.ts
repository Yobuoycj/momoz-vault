declare module '*.jsx';
declare module './App' {
  const App: React.ComponentType<any>;
  export default App;
}
import React from "react";
export declare const CurrencyProvider: React.FC<{ children: React.ReactNode }>;
export declare const ProductProvider: React.FC<{ children: React.ReactNode }>;