import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Group} from 'src/app/model/group';
import {TransactionCreationData} from 'src/app/model/transaction';
import {MatDialog} from "@angular/material/dialog";
import {AddParticipantDialogComponent} from "../add-participant-dialog/add-participant-dialog.component";
import {TransactionInitialCreationData} from "../add-transaction-container/add-transaction-container.component";

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  @Input() group!: Group;
  @Input() participants!: string[];
  @Input() prefilledTransaction: TransactionInitialCreationData | undefined;
  @Output() addTransaction = new EventEmitter<TransactionCreationData>();
  @Output() cancel = new EventEmitter<unknown>();

  form: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [this.prefilledTransaction?.comment, [Validators.required]],
      amount: [this.prefilledTransaction?.amount, [Validators.required]],
      payer: [this.prefilledTransaction?.payer, [Validators.required]],
      involvedCheckboxes: this.formBuilder.array(this.participants.map(p => this.prefilledTransaction?.involved?.includes(p)))
    });
  }

  getCheckboxControls(): FormControl[] {
    return (this.form?.get('involvedCheckboxes') as FormArray).controls as FormControl[];
  }

  formInvalid(): boolean {
    return !this.form?.valid || this.hasNoSelectedParticipants();
  }

  private hasNoSelectedParticipants(): boolean {
    if (!this.form) {
      return true;
    }

    return this.getCheckboxControls().every(control => !control.value);
  }

  submit(): void {
    if (this.form) {
      let transaction: TransactionCreationData = {
        amount: this.form.get('amount')!.value,
        comment: this.form.get('title')!.value,
        payer: this.form.get('payer')!.value,
        involved: this.getSelectedInvolved(),
        timestamp: Date.now()
      }
      this.addTransaction.emit(transaction);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  private getSelectedInvolved(): string[] {
    return Array.from(Array(this.getCheckboxControls().length).keys())
      .filter(i => this.getCheckboxControls()[i].value)
      .map(i => this.participants[i]);
  }

  onAddParticipant(): void {
    const dialogRef = this.dialog.open(AddParticipantDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe((participantName: string) => {
      if (participantName) {
        this.participants.push(participantName);
        this.refreshCheckboxes();
      }
    });
  }

  private refreshCheckboxes(): void {
    let selectedInvolved = this.getSelectedInvolved();
    this.form?.setControl('involvedCheckboxes',
      this.formBuilder.array(this.participants.map(p => selectedInvolved.includes(p))));
  }
}
