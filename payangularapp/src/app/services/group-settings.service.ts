import { Injectable } from '@angular/core';
import {GroupSettings} from "../model/group-settings";
import {Group} from "../model/group";

@Injectable({
  providedIn: 'root'
})
export class GroupSettingsService {

  private static readonly GROUP_SETTINGS_KEY = "settingsForGroupWithId";

  saveGroupSettings(group: Group, groupSettings: GroupSettings): void {
    localStorage.setItem(this.getGroupSettingsKeyForGroup(group), JSON.stringify(groupSettings));
  }

  loadGroupSettings(group: Group): GroupSettings | undefined {
    let groupSettingsAsString = localStorage.getItem(this.getGroupSettingsKeyForGroup(group));
    if (!groupSettingsAsString) {
      return undefined;
    }
    return JSON.parse(groupSettingsAsString) as GroupSettings;
  }

  private getGroupSettingsKeyForGroup(group: Group): string {
    return GroupSettingsService.GROUP_SETTINGS_KEY + group.id;
  }
}
