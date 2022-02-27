import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Balance } from 'src/app/model/balance';

@Component({
  selector: 'app-balance-table[balances]',
  templateUrl: './balance-table.component.html',
  styleUrls: ['./balance-table.component.css', '../../styles/payapp.datatable.css']
})
export class BalanceTableComponent {
  displayedColumns: string[] = ['participant', 'spent', 'owes', 'credit'];
  @Input() balances!: Balance[];
  @Output() clickRow = new EventEmitter<Balance>();

  constructor() { }

  onClick(balance: Balance): void {
    this.clickRow.emit(balance);
  }
}
