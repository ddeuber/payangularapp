import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../model/group';
import { TransactionCreationData } from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  addTransaction(transaction: TransactionCreationData, group: Group): Observable<unknown> {
    return this.http.post<unknown>(environment.baseUrl + '/addtransaction/'  + group.id, transaction);
  }

  loadTransactions(group: Group, payer: string, participant: string, limit: number, offset: number): Observable<TransactionCreationData[]> {
    return this.http.get<TransactionCreationData[]>(environment.baseUrl + '/transactions/' + group.id);
  }
}
