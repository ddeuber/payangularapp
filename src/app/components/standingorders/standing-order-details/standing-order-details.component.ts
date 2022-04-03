import {StandingOrder} from "../../../model/standingorder";
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Group} from "../../../model/group";

@Component({
  selector: 'app-standing-order-details',
  templateUrl: './standing-order-details.component.html',
  styleUrls: ['./standing-order-details.component.css', '../../../styles/payapp.detailstable.css']
})
export class StandingOrderDetailsComponent {
  @Input() standingOrder!: StandingOrder;
  @Input() group!: Group;

  @Output() deleteStandingOrder = new EventEmitter<{standingOrder: StandingOrder, group: Group}>();

  onDeleteStandingOrder(): void {
    this.deleteStandingOrder.emit({standingOrder: this.standingOrder, group: this.group});
  }
}
