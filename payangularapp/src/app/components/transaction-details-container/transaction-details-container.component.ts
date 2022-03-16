import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Transaction} from "../../model/transaction";
import {Group} from "../../model/group";
import {AddTransactionContainerComponent} from "../add-transaction-container/add-transaction-container.component";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {GroupService} from "../../services/group.service";
import {mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-transaction-details-container',
  templateUrl: './transaction-details-container.component.html',
  styleUrls: ['./transaction-details-container.component.css']
})
export class TransactionDetailsContainerComponent {
  transaction: Transaction;
  group$: Observable<Group>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog, private groupService: GroupService) {
    this.transaction = router.getCurrentNavigation()?.extras?.state as Transaction;
    this.group$ = this.activatedRoute.params.pipe(
      mergeMap(params => this.groupService.getGroupById(params['id']))
    );
  }

  openDialogWithRevertedTransaction(transactionToRevert: { group: Group, transaction: Transaction }): void {
    this.dialog.open(AddTransactionContainerComponent, {
      width: '500px',
      data: {
        group: transactionToRevert.group,
        transaction: this.revertTransaction(transactionToRevert.transaction)
      },
    })
  }

  revertTransaction(transaction: Transaction): Transaction {
    let revertedTransaction = this.deepCopy(transaction);
    revertedTransaction.amount *= -1;
    revertedTransaction.comment = "REVERTED: " + transaction.comment;
    return revertedTransaction;
  }

  deepCopy<T extends object>(source: T): T {
    return JSON.parse(JSON.stringify(source))
  }
}
