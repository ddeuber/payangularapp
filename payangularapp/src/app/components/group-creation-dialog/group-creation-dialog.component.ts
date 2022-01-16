import { Component } from '@angular/core';

@Component({
  selector: 'app-group-creation-dialog',
  templateUrl: './group-creation-dialog.component.html',
  styleUrls: ['./group-creation-dialog.component.css']
})
export class GroupCreationDialogComponent {
  groupName = "";

  constructor() {
  }
}
