import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Balance, BalanceService } from 'src/app/services/balance.service';
import { Group, GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-overview',
  templateUrl: './group-overview.component.html',
  styleUrls: ['./group-overview.component.css']
})
export class GroupOverviewComponent implements OnInit, OnDestroy {
  group: Group | undefined;
  balances: Balance[] | undefined;
  private routeSubscription: Subscription | undefined;

  constructor(private groupService: GroupService, private balanceService: BalanceService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.group = this.groupService.getGroupById(params['id']);
      if (this.group) {
        this.balanceService.loadBalances(this.group).subscribe((balances: Balance[]) => this.balances = balances);
      }
    });
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
