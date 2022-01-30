import { Component } from '@angular/core';

@Component({
  selector: 'app-add-participant-dialog',
  templateUrl: './add-participant-dialog.component.html',
  styleUrls: ['./add-participant-dialog.component.css']
})
export class AddParticipantDialogComponent {
  participantName = "";

  constructor() { }
}
