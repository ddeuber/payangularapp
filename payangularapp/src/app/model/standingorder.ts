export interface StandingOrder {
  id: number;
  creator: string;
  amount: number;
  comment: string;
  timestamp: number;
  involved: string[];
  periodicity: 'monthly' | 'quarterly' | 'yearly';
  last_execution_timestamp: number;
  next_executions: number[];
}
