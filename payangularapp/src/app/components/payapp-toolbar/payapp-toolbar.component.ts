import { Component } from '@angular/core';
import {AuthService} from "../../services/auth-service.service";

@Component({
  selector: 'app-payapp-toolbar',
  templateUrl: './payapp-toolbar.component.html',
  styleUrls: ['./payapp-toolbar.component.css']
})
export class PayappToolbarComponent {

  constructor(private authService: AuthService) {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
