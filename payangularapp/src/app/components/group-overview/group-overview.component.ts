import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Balance, BalanceService } from 'src/app/services/balance.service';
import { Group, GroupService } from 'src/app/services/group.service';
import { StandingOrder, StandingOrderService } from 'src/app/services/standing-order.service';

@Component({
  selector: 'app-group-overview',
  templateUrl: './group-overview.component.html',
  styleUrls: ['./group-overview.component.css']
})
export class GroupOverviewComponent implements OnInit, OnDestroy {
  group: Group | undefined;
  balances: Balance[] | undefined;
  standingOrders: StandingOrder[] | undefined;
  private routeSubscription: Subscription | undefined;

  constructor(private groupService: GroupService, private balanceService: BalanceService, private StandingOrderService: StandingOrderService,
    private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.groupService.getGroupById(params['id']).subscribe((group: Group | undefined) => this.setGroupAndLoadData(group))
    });
  }

  setGroupAndLoadData(group: Group | undefined): void {
    this.group = group;
    if (group) {
      this.balanceService.loadBalances(group).subscribe((balances: Balance[]) => this.balances = balances);
      this.StandingOrderService.loadStandingOrders(group).subscribe((standingOrders: StandingOrder[]) => this.standingOrders = standingOrders);
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  onLeaveGoup(): void {
    if (this.group) {
      this.groupService.leaveGroup(this.group).subscribe(res => this.router.navigate(['groups']));
    }
  }
}
