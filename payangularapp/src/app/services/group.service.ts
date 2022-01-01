import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  groupsOfUser: Group[] = [];
  currentGroup: Group | undefined;

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
      tap((group: Group) => this.groupsOfUser.push(group))
    );
  }
}
