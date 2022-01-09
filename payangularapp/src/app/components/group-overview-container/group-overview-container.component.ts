import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, mergeMap } from 'rxjs/operators';
import { Balance, BalanceService } from 'src/app/services/balance.service';
import { Group, GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-overview-container',
  templateUrl: './group-overview-container.component.html',
  styleUrls: ['./group-overview-container.component.css']
})
export class GroupOverviewContainerComponent {
  group: Group | undefined;
  balances$: Observable<Balance[] | undefined>;

  constructor(private groupService: GroupService, private balanceService: BalanceService, private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.balances$ = this.activatedRoute.params.pipe(
      mergeMap(params => this.groupService.getGroupById(params['id'])),
      tap((group: Group | undefined) => this.group = group),
      mergeMap((group: Group | undefined) => group ? this.balanceService.loadBalances(group) : of(undefined))
    );
  }

  onLeaveGoup(group: Group): void {
    this.groupService.leaveGroup(group).subscribe(res => this.router.navigate(['groups']));
  }
}
