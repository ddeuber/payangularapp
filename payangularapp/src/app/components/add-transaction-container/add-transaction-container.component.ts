import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, Observable, tap, of } from 'rxjs';
import { Group } from 'src/app/model/group';
import { Transaction } from 'src/app/model/transaction';
import { GroupService } from 'src/app/services/group.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-add-transaction-container',
  templateUrl: './add-transaction-container.component.html',
  styleUrls: ['./add-transaction-container.component.css']
})
export class AddTransactionContainerComponent {
  group: Group | undefined;
  participants$: Observable<string[] | undefined>;

  constructor(private transactionService: TransactionService, private groupService: GroupService, private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) {

    this.participants$ = activatedRoute.params.pipe(
      mergeMap(params => this.groupService.getGroupById(params['id'])),
      tap((group: Group | undefined) => this.group = group),
      mergeMap((group: Group | undefined) => group ? this.groupService.getParticipants(group) : of(undefined))
    )
  }

  onAddTransaction(transaction: Transaction): void {
    this.transactionService.addTransaction(transaction, this.group!).subscribe(
      res => this.snackBar.open('Successfully added transaction', undefined, {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-primary']
      })
    )
  }
}
