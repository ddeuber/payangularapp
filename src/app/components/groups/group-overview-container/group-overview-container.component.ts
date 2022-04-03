import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {tap, mergeMap} from 'rxjs/operators';
import {Balance} from 'src/app/model/balance';
import {Group} from 'src/app/model/group';
import {StandingOrder} from 'src/app/model/standingorder';
import {BalanceService} from 'src/app/services/balance.service';
import {GroupService} from 'src/app/services/group.service';
import {StandingOrderService} from 'src/app/services/standing-order.service';
import {MatDialog} from "@angular/material/dialog";
import {AddTransactionContainerComponent} from "../../transactions/add-transaction-container/add-transaction-container.component";
import {
  AddStandingOrderContainerComponent
} from "../../standingorders/add-standing-order-container/add-standing-order-container.component";

@Component({
  selector: 'app-group-overview-container',
  templateUrl: './group-overview-container.component.html',
  styleUrls: ['./group-overview-container.component.css']
})
export class GroupOverviewContainerComponent {
  group: Group | undefined;
  balancesAndStandingOrders$: Observable<{ balances: Balance[], standingOrders: StandingOrder[] }>;

  constructor(private groupService: GroupService, private balanceService: BalanceService, private standingOrderService: StandingOrderService,
              private router: Router, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar, private dialog: MatDialog) {

    this.balancesAndStandingOrders$ = this.activatedRoute.params.pipe(
      mergeMap(params => this.groupService.getGroupById(params['id'])),
      tap((group: Group) => this.group = group),
      mergeMap((group: Group) => forkJoin({
        balances: this.balanceService.loadBalances(group),
        standingOrders: this.standingOrderService.loadStandingOrders(group)
      }))
    );
  }

  onLeaveGroup(group: Group): void {
    this.groupService.leaveGroup(group).subscribe(() => this.router.navigate(['groups']));
  }

  onAddMember(memberEmail: string): void {
    this.groupService.addNewMemberToGroup(memberEmail, this.group!).subscribe(
      () => this.snackBar.open(`Successfully added member with email '${memberEmail}'.`, undefined, {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-primary']
      })
    )
  }

  onAddTransaction(group: Group): void {
    this.dialog.open(AddTransactionContainerComponent, {
      width: '500px',
      data: {group: group}
    })
  }

  onAddStandingOrder(group: Group): void {
    this.dialog.open(AddStandingOrderContainerComponent, {
      width: '500px',
      data: {group: group}
    })
  }

  onListTransactions(params: { group: Group, payer: string }): void {
    this.router.navigate(['groups', params.group.id, 'transactions'], {
      queryParams: {payer: params.payer}
    });
  }

  onOpenSettings(group: Group): void {
    this.router.navigate(['groups', group.id, 'settings']);
  }

  openStandingOrderDetails(params: {standingOrder: StandingOrder, group: Group}) {
    this.router.navigate(['groups', params.group.id, 'standingOrder'], {
      state: params.standingOrder
    })
  }
}
