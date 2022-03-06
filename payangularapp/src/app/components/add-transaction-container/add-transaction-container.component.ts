import {Component, Inject} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {Group} from 'src/app/model/group';
import {TransactionCreationData} from 'src/app/model/transaction';
import {GroupService} from 'src/app/services/group.service';
import {TransactionService} from 'src/app/services/transaction.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

interface AddTransactionDialogData {
  group: Group;
  transaction?: TransactionCreationData
}

@Component({
  selector: 'app-add-transaction-container',
  templateUrl: './add-transaction-container.component.html',
  styleUrls: ['./add-transaction-container.component.css']
})
export class AddTransactionContainerComponent {
  group: Group;
  participants$: Observable<string[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: AddTransactionDialogData,
              public dialogRef: MatDialogRef<AddTransactionContainerComponent>,
              private transactionService: TransactionService, private groupService: GroupService, private snackBar: MatSnackBar) {

    this.group = dialogData.group;
    this.participants$ = this.groupService.loadParticipants(this.group);
  }

  onAddTransaction(transaction: TransactionCreationData): void {
    this.transactionService.addTransaction(transaction, this.group!).subscribe(
      res => {
        this.showSuccessSnackbar();
        this.dialogRef.close();
      }
    )
  }

  private showSuccessSnackbar(): void {
    this.snackBar.open('Successfully added transaction', undefined, {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }
}
