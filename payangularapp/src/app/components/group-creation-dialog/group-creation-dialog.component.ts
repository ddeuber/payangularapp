import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GroupListComponent } from '../group-list/group-list.component';

@Component({
  selector: 'app-group-creation-dialog',
  templateUrl: './group-creation-dialog.component.html',
  styleUrls: ['./group-creation-dialog.component.css']
})
export class GroupCreationDialogComponent {
  groupName = "";

  constructor(private dialogRef: MatDialogRef<GroupListComponent>) {

  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
