import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/model/group';
import { StandingOrder } from 'src/app/model/standingorder';
import { StandingOrderService } from 'src/app/services/standing-order.service';

@Component({
  selector: 'app-standing-order-table-container',
  templateUrl: './standing-order-table-container.component.html',
  styleUrls: ['./standing-order-table-container.component.css']
})
export class StandingOrderTableContainerComponent implements OnInit {
  @Input() group!: Group;

  standingOrders$: Observable<StandingOrder[]> | undefined;

  constructor(private standingOrderService: StandingOrderService) {
  }

  ngOnInit(): void {
    this.standingOrders$ = this.standingOrderService.loadStandingOrders(this.group);
  }
}
