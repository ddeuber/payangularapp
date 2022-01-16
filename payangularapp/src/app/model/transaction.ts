export interface Transaction {
  amount: number;
  comment: string;
  creator: string;
  involved: string[];
  payer: string;
  timestamp: number;
}
