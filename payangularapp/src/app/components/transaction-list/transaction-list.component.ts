import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Transaction, TransactionLoadParams} from "../../model/transaction";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css', '../../styles/payapp.datatable.css']
})
export class TransactionListComponent implements OnInit {
  @Input() transactions!: Transaction[];
  @Input() participants!: string[];
  @Input() totalNumberOfTransactions = 0;
  @Input() payer: string | undefined;
  @Input() involved: string | undefined;
  @Input() itemsPerPage = 0;
  @Input() offset = 0;

  displayedColumns = ['payer', 'amount', 'title'];
  dataSource = new MatTableDataSource<Transaction>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() loadTransactions = new EventEmitter<TransactionLoadParams>();

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Transaction>(this.transactions);
  }

  onPageEvent(pageEvent: PageEvent): void {
    this.loadTransactions.emit({
      limit: pageEvent.pageSize,
      offset: pageEvent.pageIndex * pageEvent.pageSize,
      payer: this.payer,
      participant: this.involved,
    })
  }

  onFilterChange(): void {
    this.loadTransactions.emit({
      limit: this.paginator.pageSize,
      offset: 0,
      payer: this.payer,
      participant: this.involved,
    })
  }
}
