import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {TransactionService} from "../../services/transaction.service";
import {combineLatest, forkJoin, mergeMap, Observable } from "rxjs";
import {Transaction, TransactionLoadParams} from "../../model/transaction";
import {GroupService} from "../../services/group.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Group} from "../../model/group";
import {map, tap} from "rxjs/operators";

interface LoadTransactionDataResult {
  transactions: Transaction[],
  participants: string[],
  totalNumberOfTransactions: number
}

@Component({
  selector: 'app-transaction-list-container',
  templateUrl: './transaction-list-container.component.html',
  styleUrls: ['./transaction-list-container.component.css']
})
export class TransactionListContainerComponent {
  transactionData$: Observable<LoadTransactionDataResult>
  itemsPerPage = 10;
  offset = 0;
  payer: string | undefined;
  participant: string | undefined;

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
        totalNumberOfTransactions: this.transactionService.loadTotalNumberOfTransactions(res.group, res.loadParams.payer, res.loadParams.participant)
      }))
    );
  }

  private parseUrlParams(params: Params): TransactionLoadParams {
    this.itemsPerPage = params['limit'] ? params['limit'] : this.itemsPerPage;
    this.offset = params['offset'] ? params['offset'] : this.offset;
    this.payer = params['payer'];
    this.participant = params['participant'];

    return {
      limit: this.itemsPerPage,
      offset: this.offset,
      payer: this.payer,
      participant: this.participant
    };
  }

  onLoadTransaction(loadParams: TransactionLoadParams) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: loadParams
    })
  }
}
