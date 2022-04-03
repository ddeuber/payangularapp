import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Balance } from 'src/app/model/balance';
import { Group } from 'src/app/model/group';
import { StandingOrder } from 'src/app/model/standingorder';
import { AddMemberDialogComponent } from '../add-member-dialog/add-member-dialog.component';
import { LeaveGroupDialogComponent } from '../leave-group-dialog/leave-group-dialog.component';

@Component({
  selector: 'app-group-overview',
  templateUrl: './group-overview.component.html',
  styleUrls: ['./group-overview.component.css']
})
export class GroupOverviewComponent {
  @Input() group!: Group;
  @Input() balances!: Balance[];
  @Input() standingOrders!: StandingOrder[];

  @Output() leaveGroup = new EventEmitter<Group>();
  @Output() addMember = new EventEmitter<string>();
  @Output() addTransaction = new EventEmitter<Group>();
  @Output() listTransactions = new EventEmitter<{ group: Group, payer: string }>();
  @Output() openSettings = new EventEmitter<Group>();
  @Output() showStandingOrder = new EventEmitter<{ standingOrder: StandingOrder, group: Group }>();
  @Output() addStandingOrder = new EventEmitter<Group>();

  constructor(private dialog: MatDialog) {
  }

  onLeaveGroup(): void {
    const leaveDialog = this.dialog.open(LeaveGroupDialogComponent, {
      data: { group: this.group }
    });
    leaveDialog.afterClosed().subscribe(
      (confirmed: boolean) => { if (confirmed) this.leaveGroup.emit(this.group) }
    );
  }

  onAddMember(): void {
    const addMemberDialog = this.dialog.open(AddMemberDialogComponent, {
      width: '300px'
    });
    addMemberDialog.afterClosed().subscribe(
      (memberEmail: string) => { if (memberEmail) this.addMember.emit(memberEmail) }
    );
  }

  onAddTransaction(): void {
    this.addTransaction.emit(this.group);
  }

  onClickBalance(balance: Balance): void {
    this.listTransactions.emit({group: this.group, payer: balance.participant});
  }

  onClickStandingOrder(standingOrder: StandingOrder) {
    this.showStandingOrder.emit({standingOrder: standingOrder, group: this.group});
  }

  onAddStandingOrder() {
    this.addStandingOrder.emit(this.group);
  }

  onOpenSettings(): void {
    this.openSettings.emit(this.group);
  }
}
