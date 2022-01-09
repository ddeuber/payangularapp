import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Balance } from 'src/app/services/balance.service';
import { Group } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-overview',
  templateUrl: './group-overview.component.html',
  styleUrls: ['./group-overview.component.css']
})
export class GroupOverviewComponent {
  @Input() group!: Group;
  @Input() balances!: Balance[];

  constructor() {
  }
}
