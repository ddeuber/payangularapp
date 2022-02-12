import {Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import {Transaction} from "../../model/transaction";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css', '../../styles/payapp.datatable.css']
})
export class TransactionListComponent implements OnInit {
  @Input() transactions!: Transaction[];
  @Input() participants!: string[];
  @Input() payer: string | undefined;
  @Input() involved: string | undefined;

  displayedColumns = ['payer', 'amount', 'title'];
  dataSource = new MatTableDataSource<Transaction>([]);

  @Output() changedFilter = new EventEmitter<{ payer?: string, participant?: string }>();
  @Output() scrollToBottom = new EventEmitter<unknown>();

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Transaction>(this.transactions);
  }

  onFilterChange(): void {
    this.changedFilter.emit({
      payer: this.payer,
      participant: this.involved,
    })
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.scrollToBottom.emit();
    }
  }
}
