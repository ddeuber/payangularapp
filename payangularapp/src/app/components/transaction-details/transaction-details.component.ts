import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Transaction} from "../../model/transaction";
import {Group} from "../../model/group";

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css', '../../styles/payapp.detailstable.css']
})
export class TransactionDetailsComponent {
  @Input() transaction!: Transaction;
  @Input() group!: Group;
  @Output() revertTransaction = new EventEmitter<{group: Group, transaction: Transaction}>();

  onRevertTransaction(): void {
    this.revertTransaction.emit({group: this.group, transaction: this.transaction});
  }
}
