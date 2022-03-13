import { Component } from '@angular/core';
import {GroupService} from "../../services/group.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Group} from "../../model/group";
import {Observable} from "rxjs";
import {map, mergeMap} from "rxjs/operators";
import {GroupSettingsService} from "../../services/group-settings.service";
import {GroupSettings} from "../../model/group-settings";

@Component({
  selector: 'app-group-settings-container',
  templateUrl: './group-settings-container.component.html',
  styleUrls: ['./group-settings-container.component.css']
})
export class GroupSettingsContainerComponent {
  group$: Observable<Group>;
  participants$: Observable<string[]>;
  groupSettings$: Observable<GroupSettings>;

  constructor(private groupSettingsService: GroupSettingsService, private groupService: GroupService,
              private activatedRoute: ActivatedRoute, private router: Router) {
    this.group$ = this.activatedRoute.params.pipe(
      mergeMap(params => this.groupService.getGroupById(params['id']))
    );

    this.participants$ = this.group$.pipe(
      mergeMap((group: Group) => this.groupService.loadParticipants(group))
    )

    this.groupSettings$ = this.group$.pipe(
      map((group: Group) => {
        let groupSettings = this.groupSettingsService.loadGroupSettings(group)
        if (!groupSettings) {
          return {defaultInvolved: []};
        }
        return groupSettings;
      })
    )
  }

  saveGroupSettings(params: {group: Group, groupSettings: GroupSettings}): void {
    this.groupSettingsService.saveGroupSettings(params.group, params.groupSettings);
    this.router.navigate(['groups', params.group.id]);
  }
}
