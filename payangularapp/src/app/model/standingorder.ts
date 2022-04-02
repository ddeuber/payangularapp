export enum Periodicity {
  monthly = 'monthly',
  quarterly = 'quarterly',
  yearly = 'yearly'
}

export interface StandingOrder {
  id: number;
  payer: string;
  creator: string;
  amount: number;
  comment: string;
  timestamp: number;
  involved: string[];
  periodicity: Periodicity;
  last_execution_timestamp: number;
  next_executions: number[];
}

export interface StandingOrderCreationData {
  payer: string;
  amount: number;
  comment: string;
  involved: string[];
  periodicity: Periodicity;
  day?: number;
}
