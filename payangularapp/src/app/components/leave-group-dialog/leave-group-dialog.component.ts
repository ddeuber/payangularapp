import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GroupOverviewComponent } from '../group-overview/group-overview.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Group } from 'src/app/model/group';


@Component({
  selector: 'app-leave-group-dialog',
  templateUrl: './leave-group-dialog.component.html',
  styleUrls: ['./leave-group-dialog.component.css']
})
export class LeaveGroupDialogComponent {
  group : Group;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {group: Group}) {
    this.group = data.group;
  }
}
