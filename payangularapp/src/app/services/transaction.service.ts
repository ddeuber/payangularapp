import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../model/group';
import { Transaction } from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  addTransaction(transaction: Transaction, group: Group): Observable<unknown> {
    return this.http.post<unknown>(environment.baseUrl + '/addtransaction/'  + group.id, transaction);
  }

  loadTransactions(group: Group, payer: string, participant: string, limit: number, offset: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(environment.baseUrl + '/transactions/' + group.id);
  }
}
