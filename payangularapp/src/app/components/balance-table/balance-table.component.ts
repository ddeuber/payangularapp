import { Component, Input, OnInit } from '@angular/core';
import { Balance } from 'src/app/services/balance.service';
import { Group } from 'src/app/services/group.service';

@Component({
  selector: 'app-balance-table[balances]',
  templateUrl: './balance-table.component.html',
  styleUrls: ['./balance-table.component.css']
})
export class BalanceTableComponent implements OnInit {
  displayedColumns: string[] = ['participant', 'spent', 'owes', 'credit'];
  @Input() balances!: Balance[];

  constructor() { }

  ngOnInit(): void {
  }

  onClick(balance: Balance): void {
    alert(JSON.stringify(balance));
  }
}
