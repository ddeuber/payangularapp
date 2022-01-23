import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { timestamp } from 'rxjs';
import { Group } from 'src/app/model/group';
import { TransactionCreationData } from 'src/app/model/transaction';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  @Input() group!: Group;
  @Input() participants!: string[];
  @Input() prefilledTitle: string | undefined;
  @Input() prefilledPayer: string | undefined;
  @Input() prefilledAmount: number | undefined;
  @Output() addTransaction = new EventEmitter<TransactionCreationData>();

  form: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [this.prefilledTitle, [Validators.required]],
      amount: [this.prefilledAmount, [Validators.required]],
      payer: [this.prefilledPayer, [Validators.required]],
      involvedCheckboxes: this.formBuilder.array(this.participants.map(p => false))
    });
  }

  getCheckboxControls(): FormControl[] {
    return (this.form?.get('involvedCheckboxes') as FormArray).controls as FormControl[];
  }

  get hasNoSelectedParticipants(): boolean {
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

  private getSelectedInvolved(): string[] {
    return Array.from(Array(this.participants.length).keys())
      .filter(i => this.getCheckboxControls()[i].value)
      .map(i => this.participants[i]);
  }
}
