import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GroupService, Group } from 'src/app/services/group.service';
import { GroupCreationDialogComponent } from '../group-creation-dialog/group-creation-dialog.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: Group[] = [];

  constructor(private groupService: GroupService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.groupService.loadGroups().subscribe((groups: Group[]) => this.groups = groups);
  }

  onCreateGroup(): void {
    const dialogRef = this.dialog.open(GroupCreationDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe((groupName: string) => {
      if (groupName) {
        this.groupService.addGroup(groupName).subscribe((group: Group) => this.groups = this.groupService.groupsOfUser);
      }
    });
  }

  onGroupSelected(group: Group): void {
    this.router.navigate(['groups', group.id]);
  }
}
