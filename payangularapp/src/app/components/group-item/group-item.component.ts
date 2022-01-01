import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-item[group]',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {
  @Input() group!: Group;

  constructor() { }

  ngOnInit(): void {
  }

}
