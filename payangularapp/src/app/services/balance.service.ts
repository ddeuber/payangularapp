import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from './group.service';

export interface Balance {
  participant: string;
  spent: number;
  owes: number;
  credit: number;
}

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient) { }

  loadBalances(group: Group): Observable<Balance[]> {
    return this.http.get<Balance[]>(environment.baseUrl + '/debts/' + group.id, {});
  }
}
