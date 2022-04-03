export interface TransactionCreationData {
  amount: number;
  comment: string;
  involved: string[];
  payer: string;
  timestamp: number;
}

export interface Transaction extends TransactionCreationData {
  creator: string;
}

export interface TransactionLoadParams {
  limit: number;
  offset: number;
  payer?: string;
  participant?: string;
}
