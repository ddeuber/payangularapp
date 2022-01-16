import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GroupCreationDialogComponent } from '../group-creation-dialog/group-creation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Group } from 'src/app/model/group';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent {
  @Input() groups!: Group[];
  @Output() groupCreation = new EventEmitter<string>();
  @Output() groupSelection = new EventEmitter<Group>();

  constructor(private dialog: MatDialog) { }

  onCreateGroup(): void {
    const dialogRef = this.dialog.open(GroupCreationDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe((groupName: string) => {
      if (groupName) {
        this.groupCreation.emit(groupName);
      }
    });
  }

  onGroupSelected(group: Group): void {
    this.groupSelection.emit(group);
  }
}
