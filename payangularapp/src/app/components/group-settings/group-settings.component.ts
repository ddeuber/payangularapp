import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Group} from "../../model/group";
import {GroupSettings} from "../../model/group-settings";

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.css']
})
export class GroupSettingsComponent {
  @Input() group!: Group;
  @Input() participants!: string[];
  @Input() groupSettings!: GroupSettings;

  @Output() saveGroupSettings = new EventEmitter<{ group: Group, groupSettings: GroupSettings }>();

  onSave() {
    this.saveGroupSettings.emit({group: this.group, groupSettings: this.groupSettings});
  }
}
