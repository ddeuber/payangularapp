import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Group } from 'src/app/model/group';

@Component({
  selector: 'app-group-item[group]',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent {
  @Input() group!: Group;
  @Output() groupSelection = new EventEmitter<Group>();

  constructor() { }

  onClick() {
    return this.groupSelection.emit(this.group);
  }
}
