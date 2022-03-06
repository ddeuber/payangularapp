import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';
import {Transaction} from "../../model/transaction";
import {Observable} from "rxjs";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css', '../../styles/payapp.datatable.css']
})
export class TransactionListComponent {
  @Input() transactions$!: Observable<Transaction[]>;

  displayedColumns = ['payer', 'amount', 'title'];

  @Output() scrollToBottom = new EventEmitter<unknown>();
  @Output() selectTransaction = new EventEmitter<Transaction>();

  onClickTransaction(transaction: Transaction): void {
    this.selectTransaction.emit(transaction);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      this.scrollToBottom.emit();
    }
  }
}
