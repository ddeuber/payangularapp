import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../model/group';
import {Transaction, TransactionCreationData, TransactionLoadParams} from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  addTransaction(transaction: TransactionCreationData, group: Group): Observable<unknown> {
    return this.http.post<unknown>(environment.baseUrl + '/addtransaction/'  + group.id, transaction);
  }

  loadTransactions(group: Group, loadParams: TransactionLoadParams): Observable<Transaction[]> {
    return this.http.post<Transaction[]>(environment.baseUrl + '/transactions/' + group.id,
      {
        payer: loadParams.payer,
        participant: loadParams.participant,
        limit: loadParams.limit,
        offset: loadParams.offset
      });
  }

  loadTotalNumberOfTransactions(group: Group, payer?: string, participant?: string): Observable<number> {
    return this.http.post<number>(environment.baseUrl + '/counttransactions/' + group.id, {
      payer, participant
    });
  }
}
