import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Group } from 'src/app/model/group';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-list-container',
  templateUrl: './group-list-container.component.html',
  styleUrls: ['./group-list-container.component.css']
})
export class GroupListContainerComponent {
  groups$: Observable<Group[]>;

  constructor(private groupService: GroupService, private router: Router) {
    this.groups$ = this.groupService.loadGroups();
  }

  onCreateGroup(groupName: string): void {
    this.groups$ = this.groupService.addGroup(groupName).pipe(
      map(res => this.groupService.groupsOfUser!)
    )
  }

  onGroupSelected(group: Group): void {
    this.router.navigate(['groups', group.id]);
  }
}
