import {Component, Inject, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {Group} from 'src/app/model/group';
import {TransactionCreationData} from 'src/app/model/transaction';
import {GroupService} from 'src/app/services/group.service';
import {TransactionService} from 'src/app/services/transaction.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {GroupSettingsService} from "../../services/group-settings.service";

interface AddTransactionDialogData {
  group: Group;
  transaction?: TransactionInitialCreationData
}

export interface TransactionInitialCreationData {
  amount?: number;
  comment?: string;
  involved?: string[];
  payer?: string;
}

@Component({
  selector: 'app-add-transaction-container',
  templateUrl: './add-transaction-container.component.html',
  styleUrls: ['./add-transaction-container.component.css']
})
export class AddTransactionContainerComponent implements OnInit {
  group: Group;
  prefilledTransaction?: TransactionInitialCreationData;

  participants$: Observable<string[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: AddTransactionDialogData, private groupSettingsService: GroupSettingsService,
              public dialogRef: MatDialogRef<AddTransactionContainerComponent>, private router: Router,
              private transactionService: TransactionService, private groupService: GroupService, private snackBar: MatSnackBar) {

    this.group = dialogData.group;
    this.prefilledTransaction = dialogData.transaction;
    this.participants$ = this.groupService.loadParticipants(this.group);
  }

  ngOnInit(): void {
    if (!this.prefilledTransaction) {
      this.prefilledTransaction = this.loadDefaultValues(this.group);
    }
  }

  private loadDefaultValues(group: Group): TransactionInitialCreationData | undefined {
    let groupSettings = this.groupSettingsService.loadGroupSettings(group);
    if (!groupSettings) {
      return undefined;
    }

    return {payer: groupSettings.defaultPayer, involved: groupSettings.defaultInvolved};
  }


  onAddTransaction(transaction: TransactionCreationData): void {
    if (this.group) {
      this.transactionService.addTransaction(transaction, this.group).subscribe(
        () => {
          this.showSuccessSnackbar();
          this.dialogRef.close();
          // this is needed in order for the balances table to be reloaded after adding a transaction
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['groups', this.group.id]);
          });
        }
      )
    }
  }

  private showSuccessSnackbar(): void {
    this.snackBar.open('Successfully added transaction', undefined, {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }
}
