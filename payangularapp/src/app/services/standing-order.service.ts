import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from './group.service';

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

@Injectable({
  providedIn: 'root'
})
export class StandingOrderService {

  constructor(private http: HttpClient) { }

  loadStandingOrders(group: Group): Observable<StandingOrder[]> {
    return this.http.get<StandingOrder[]>(environment.baseUrl + '/standingorders/' + group.id, {});
  }
}
