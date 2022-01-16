import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Group } from 'src/app/model/group';

@Component({
  selector: 'app-group-item[group]',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {
  @Input() group!: Group;
  @Output() groupSelection = new EventEmitter<Group>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    return this.groupSelection.emit(this.group);
  }
}
