import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {TransactionService} from "../../services/transaction.service";
import {combineLatest, mergeMap, Observable} from "rxjs";
import {Transaction, TransactionLoadParams} from "../../model/transaction";
import {GroupService} from "../../services/group.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Group} from "../../model/group";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-transaction-list-container',
  templateUrl: './transaction-list-container.component.html',
  styleUrls: ['./transaction-list-container.component.css']
})
export class TransactionListContainerComponent implements OnInit {
  static readonly ITEMS_PER_REQUEST = 20;

  participants$!: Observable<string[]>;
  transactions$!: Observable<Transaction[]>;

  // The following fields are set in reset()
  showTransactionSpinner!:  boolean;
  loadedTransactions!: Transaction[];
  allTransactionsLoaded!: boolean;

  payer: string | undefined;
  participant: string | undefined;

  constructor(private transactionService: TransactionService, private groupService: GroupService,
              private location: Location, private router: Router, private activatedRoute: ActivatedRoute) {
    this.reset();
  }

  private reset(): void {
    this.loadedTransactions = [];
    this.allTransactionsLoaded = false;
    this.showTransactionSpinner = true;
  }

  ngOnInit(): void {
    this.loadParticipants();
    this.loadTransactions();
  }

  private loadTransactions(): void {
    this.transactions$ = this.activatedRoute.params.pipe(
      mergeMap(params => combineLatest({
        group: this.groupService.getGroupById(params['id']),
        queryParams: this.activatedRoute.queryParams
      })),
      map((res: { group: Group, queryParams: Params }) => {
        return {group: res.group, loadParams: this.parseUrlParamsForLoadingNextTransactions(res.queryParams)};
      }),
      mergeMap((res: { group: Group, loadParams: TransactionLoadParams }) =>
        this.transactionService.loadTransactions(res.group, res.loadParams)
      ),
      map((transactions: Transaction[]) => this.appendToAlreadyLoadedTransactions(transactions)),
      tap((transactions: Transaction[]) => this.showTransactionSpinner = false)
    );
  }

  private loadParticipants(): void {
    this.participants$ = this.activatedRoute.params.pipe(
      mergeMap(params => this.groupService.getGroupById(params['id'])),
      mergeMap((group: Group) => this.groupService.loadParticipants(group))
    );
  }

  private parseUrlParamsForLoadingNextTransactions(params: Params): TransactionLoadParams {
    this.payer = params['payer'];
    this.participant = params['participant'];

    return {
      limit: TransactionListContainerComponent.ITEMS_PER_REQUEST,
      offset: this.loadedTransactions.length,
      payer: this.payer,
      participant: this.participant
    };
  }

  private appendToAlreadyLoadedTransactions(newlyLoadedTransactions: Transaction[]): Transaction[] {
    this.allTransactionsLoaded = newlyLoadedTransactions.length == 0;
    this.loadedTransactions = this.loadedTransactions.concat(newlyLoadedTransactions);
    return this.loadedTransactions;
  }

  onChangedFilter(filters: { payer?: string, participant?: string }): void {
    this.reset();
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: filters
    })
  }

  onLoadMoreTransactions(): void {
    if (!this.allTransactionsLoaded) {
      this.loadTransactions();
    }
  }
}
