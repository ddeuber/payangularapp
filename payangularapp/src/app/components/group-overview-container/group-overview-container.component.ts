import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, mergeMap } from 'rxjs/operators';
import { Balance } from 'src/app/model/balance';
import { Group } from 'src/app/model/group';
import { BalanceService } from 'src/app/services/balance.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-overview-container',
  templateUrl: './group-overview-container.component.html',
  styleUrls: ['./group-overview-container.component.css']
})
export class GroupOverviewContainerComponent {
  group: Group | undefined;
  balances$: Observable<Balance[] | undefined>;

  constructor(private groupService: GroupService, private balanceService: BalanceService, private router: Router,
    private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar) {

    this.balances$ = this.activatedRoute.params.pipe(
      mergeMap(params => this.groupService.getGroupById(params['id'])),
      tap((group: Group | undefined) => this.group = group),
      mergeMap((group: Group | undefined) => group ? this.balanceService.loadBalances(group) : of(undefined))
    );
  }

  onLeaveGroup(group: Group): void {
    this.groupService.leaveGroup(group).subscribe(res => this.router.navigate(['groups']));
  }

  onAddMember(memberEmail: string): void {
    this.groupService.addNewMemberToGroup(memberEmail, this.group!).subscribe(
      res => this.snackBar.open(`Successfully added member with email '${memberEmail}'.`, undefined, {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-primary']
      })
    )
  }

  onAddTransaction(group: Group): void{
    this.router.navigate(['groups', group.id, 'addtransaction']);
  }
}
