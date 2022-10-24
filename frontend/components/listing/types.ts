export type StatusType = 'available' | 'pending'

export interface ListingProps {
  title: string;
  image: string;
  description: string;
  location: string;
  categories: string[];
  status: StatusType;
  trade: boolean;
  cash: boolean;
  bank: boolean;
  weight: number;
  volume: number;
  tradeDescription: string;
  material: string[];
  tradeCategories: string[];
  price: number;
}
