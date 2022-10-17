export type StatusType = 'available' | 'pending'

export type ItemStatsType = 'weight' | 'volume'

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
  stats: ItemStatsType;
  material: string[];
  tradeCategories: string[];
  price: number;
}
