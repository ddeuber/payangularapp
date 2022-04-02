import {Component, Inject} from '@angular/core';
import {Group} from "../../model/group";
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GroupSettingsService} from "../../services/group-settings.service";
import {Router} from "@angular/router";
import {StandingOrderService} from "../../services/standing-order.service";
import {GroupService} from "../../services/group.service";
import {StandingOrderCreationData} from "../../model/standingorder";
import {AddStandingOrderComponent} from "../add-standing-order/add-standing-order.component";

@Component({
  selector: 'app-add-standing-order-container',
  templateUrl: './add-standing-order-container.component.html',
  styleUrls: ['./add-standing-order-container.component.css']
})
export class AddStandingOrderContainerComponent {
  group: Group;
  participants$: Observable<string[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: {group: Group}, private groupSettingsService: GroupSettingsService,
              public dialogRef: MatDialogRef<AddStandingOrderComponent>, private router: Router,
              private standingOrderService: StandingOrderService, private groupService: GroupService) {

    this.group = dialogData.group;
    this.participants$ = this.groupService.loadParticipants(this.group);
  }

  addStandingOrder(standingOrder: StandingOrderCreationData): void {
    if (this.group) {
      this.standingOrderService.addStandingOrder(standingOrder, this.group).subscribe(
        () => {
          this.dialogRef.close();
          // this is needed in order for the balances table to be reloaded after adding a transaction
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['groups', this.group.id]);
          });
        }
      )
    }
  }
}
