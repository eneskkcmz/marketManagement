import { Aisle } from "./aisle.model";

export interface Market {
    id: number;
    name: string; // Market adı
    aisles: Aisle[]; // Marketin reyonları
  }
  