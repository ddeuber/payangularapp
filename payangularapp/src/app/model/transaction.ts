export interface TransactionCreationData {
  amount: number;
  comment: string;
  involved: string[];
  payer: string;
  timestamp: number;
}
