import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {TransactionService} from "../../services/transaction.service";
import {combineLatest, forkJoin, mergeMap, Observable} from "rxjs";
import {Transaction, TransactionLoadParams} from "../../model/transaction";
import {GroupService} from "../../services/group.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Group} from "../../model/group";
import {map, tap} from "rxjs/operators";

interface LoadTransactionDataResult {
  transactions: Transaction[],
  participants: string[],
}

@Component({
  selector: 'app-transaction-list-container',
  templateUrl: './transaction-list-container.component.html',
  styleUrls: ['./transaction-list-container.component.css']
})
export class TransactionListContainerComponent {
  static readonly ITEMS_PER_REQUEST = 20;

  transactionData$: Observable<LoadTransactionDataResult>

  loadedTransactions: Transaction[] = [];
  payer: string | undefined;
  participant: string | undefined;
  offset = 0;

  constructor(private transactionService: TransactionService, private groupService: GroupService,
              private location: Location, private router: Router, private activatedRoute: ActivatedRoute) {
    this.transactionData$ = this.loadTransactions();
  }

  private loadTransactions(): Observable<LoadTransactionDataResult> {
    return this.activatedRoute.params.pipe(
      mergeMap(params => combineLatest({
        group: this.groupService.getGroupById(params['id']),
        queryParams: this.activatedRoute.queryParams
      })),
      map((res: { group: Group, queryParams: Params }) => {
        return {group: res.group, loadParams: this.parseUrlParams(res.queryParams)};
      }),
      mergeMap((res: { group: Group, loadParams: TransactionLoadParams }) => forkJoin({
        transactions: this.transactionService.loadTransactions(res.group, res.loadParams),
        participants: this.groupService.loadParticipants(res.group),
      })),
      tap(this.appendToAlreadyLoadedTransactions)
    );
  }

  private parseUrlParams(params: Params): TransactionLoadParams {
    this.payer = params['payer'];
    this.participant = params['participant'];

    return {
      limit: TransactionListContainerComponent.ITEMS_PER_REQUEST,
      offset: this.offset,
      payer: this.payer,
      participant: this.participant
    };
  }

  private appendToAlreadyLoadedTransactions(loadTransactionResult: LoadTransactionDataResult) {
    this.loadedTransactions = this.loadedTransactions ? this.loadedTransactions.concat(loadTransactionResult.transactions) : loadTransactionResult.transactions;
    return {
      transactions: this.loadedTransactions,
      participants: loadTransactionResult.participants
    }
  }

  onChangedFilter(filters: { payer?: string, participant?: string }): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: filters
    })
  }

  onLoadMoreTransactions(): void {
    this.offset = this.loadedTransactions.length;
    this.transactionData$ = this.loadTransactions();
  }
}
