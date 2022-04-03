import {Component} from '@angular/core';
import {StandingOrder} from "../../../model/standingorder";
import {Observable} from "rxjs";
import {Group} from "../../../model/group";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {GroupService} from "../../../services/group.service";
import {mergeMap} from "rxjs/operators";
import {StandingOrderService} from "../../../services/standing-order.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  DeleteStandingOrderDialogComponent
} from "../delete-standing-order-dialog/delete-standing-order-dialog.component";

@Component({
  selector: 'app-standing-order-details-container',
  templateUrl: './standing-order-details-container.component.html',
  styleUrls: ['./standing-order-details-container.component.css']
})
export class StandingOrderDetailsContainerComponent {
  standingOrder: StandingOrder;
  group$: Observable<Group>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private groupService: GroupService,
              private standingOrderService: StandingOrderService, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.standingOrder = router.getCurrentNavigation()?.extras?.state as StandingOrder;
    this.group$ = this.activatedRoute.params.pipe(
      mergeMap(params => this.groupService.getGroupById(params['id']))
    );
  }

  deleteStandingOrderIfConfirmed(params: { standingOrder: StandingOrder, group: Group }): void {
    const dialogRef = this.dialog.open(DeleteStandingOrderDialogComponent);
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteStandingOrder(params.standingOrder, params.group);
      }
    })
  }

  private deleteStandingOrder(standingOrder: StandingOrder, group: Group) {
    this.standingOrderService.deleteStandingOrder(standingOrder, group).subscribe(() => {
      this.showSuccessSnackbar();
      this.router.navigate(['groups', group.id]);
    });
  }

  private showSuccessSnackbar(): void {
    this.snackBar.open('Successfully deleted standing order', undefined, {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }
}
