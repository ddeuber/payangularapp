import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from "../../../model/group";
import {MatDialog} from "@angular/material/dialog";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AddParticipantDialogComponent} from "../../groups/add-participant-dialog/add-participant-dialog.component";
import {StandingOrderCreationData, Periodicity} from "../../../model/standingorder";

@Component({
  selector: 'app-add-standing-order',
  templateUrl: './add-standing-order.component.html',
  styleUrls: ['./add-standing-order.component.css']
})
export class AddStandingOrderComponent implements OnInit {
  @Input() group!: Group;
  @Input() participants!: string[];
  @Output() addStandingOrder = new EventEmitter<StandingOrderCreationData>();
  @Output() cancel = new EventEmitter<unknown>();

  form: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      periodicity: [null, [Validators.required]],
      day: [null, [Validators.min(1), Validators.max(28)]],
      payer: [null, [Validators.required]],
      involvedCheckboxes: this.formBuilder.array(this.participants.map(() => false))
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
      let standingOrder: StandingOrderCreationData = {
        amount: this.form.get('amount')!.value,
        comment: this.form.get('title')!.value,
        payer: this.form.get('payer')!.value,
        involved: this.getSelectedInvolved(),
        periodicity: this.form.get('periodicity')!.value,
        day: this.form.get('day')?.value,
      }
      this.addStandingOrder.emit(standingOrder);
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

  getPeriodicities(): string[] {
    return Object.values(Periodicity);
  }
}
