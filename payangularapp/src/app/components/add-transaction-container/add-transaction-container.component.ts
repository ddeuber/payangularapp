import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, Observable, tap } from 'rxjs';
import { Group } from 'src/app/model/group';
import { TransactionCreationData } from 'src/app/model/transaction';
import { GroupService } from 'src/app/services/group.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-add-transaction-container',
  templateUrl: './add-transaction-container.component.html',
  styleUrls: ['./add-transaction-container.component.css']
})
export class AddTransactionContainerComponent {
  group: Group | undefined;
  participants$: Observable<string[]>;

  constructor(private transactionService: TransactionService, private groupService: GroupService, private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute, private router: Router) {

    this.participants$ = activatedRoute.params.pipe(
      mergeMap(params => this.groupService.getGroupById(params['id'])),
      tap((group: Group) => this.group = group),
      mergeMap((group: Group) => this.groupService.loadParticipants(group))
    )
  }

  onAddTransaction(transaction: TransactionCreationData): void {
    this.transactionService.addTransaction(transaction, this.group!).subscribe(
      res => {
        this.showSuccessSnackbar();
        this.goBackToGroupOverview();
      }
    )
  }

  private showSuccessSnackbar(): void {
    this.snackBar.open('Successfully added transaction', undefined, {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  private goBackToGroupOverview(): void {
    this.router.navigate(['groups', this.group!.id]);
  }
}
