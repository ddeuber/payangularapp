import { Component, Input } from '@angular/core';
import { Balance } from 'src/app/model/balance';

@Component({
  selector: 'app-balance-table[balances]',
  templateUrl: './balance-table.component.html',
  styleUrls: ['./balance-table.component.css', '../../styles/payapp.datatable.css']
})
export class BalanceTableComponent {
  displayedColumns: string[] = ['participant', 'spent', 'owes', 'credit'];
  @Input() balances!: Balance[];

  constructor() { }

  onClick(balance: Balance): void {
    alert(JSON.stringify(balance));
  }
}
