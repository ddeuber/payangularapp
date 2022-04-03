import {Component, EventEmitter, Input, Output} from '@angular/core';
import { StandingOrder } from 'src/app/model/standingorder';

@Component({
  selector: 'app-standing-order-table[standingOrders]',
  templateUrl: './standing-order-table.component.html',
  styleUrls: ['./standing-order-table.component.css', '../../../styles/payapp.datatable.css']
})
export class StandingOrderTableComponent {
  displayedColumns: string[] = ['payer', 'amount', 'title', 'nextExecution'];
  @Input() standingOrders! : StandingOrder[];

  @Output() clickRow = new EventEmitter<StandingOrder>();

  onClickRow(standingOrder: StandingOrder): void {
    this.clickRow.emit(standingOrder);
  }

}
