import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Group {
  id: number;
  name: string;
}

interface Groups {
  groups: Group[];
}

interface GroupId {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  groupsOfUser: Group[] | undefined;

  constructor(private http: HttpClient) {
  }

  loadGroups(): Observable<Group[]> {
    return this.http.get<Groups>(environment.baseUrl + '/groups').pipe(
      map((groups: Groups) => groups.groups),
      tap((groups: Group[]) => this.groupsOfUser = groups)
    )
  }

  addGroup(groupName: string): Observable<Group> {
    return this.http.post<GroupId>(environment.baseUrl + '/addgroup', { 'name': groupName }).pipe(
      map((id: GroupId) => { return { 'id': id.id, 'name': groupName }; }),
      tap((group: Group) => this.groupsOfUser?.push(group))
    );
  }

  leaveGroup(group: Group): Observable<unknown> {
    return this.http.post<unknown>(environment.baseUrl + '/leavegroup/' + group.id, {});
  }

  getGroupById(id: number): Observable<Group | undefined> {
    if (this.groupsOfUser) {
      return of(this.groupsOfUser.find(g => g.id == id));
    } else {
      return this.loadGroups().pipe(
        map((groups: Group[]) => groups.find(g => g.id == id))
      )
    }
  }

  addNewMemberToGroup(memberEmail: string, group: Group) {
    return this.http.post<unknown>(environment.baseUrl + '/addusertogroup/' + group.id, { email: memberEmail });
  }
}
