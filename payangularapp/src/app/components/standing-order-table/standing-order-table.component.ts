import { Component, Input, OnInit } from '@angular/core';
import { StandingOrder } from 'src/app/model/standingorder';

@Component({
  selector: 'app-standing-order-table[standingOrders]',
  templateUrl: './standing-order-table.component.html',
  styleUrls: ['./standing-order-table.component.css']
})
export class StandingOrderTableComponent implements OnInit {
  displayedColumns: string[] = ['payer', 'amount', 'title', 'nextExecution'];
  @Input() standingOrders! : StandingOrder[];

  constructor() { }

  ngOnInit(): void {
  }
}
