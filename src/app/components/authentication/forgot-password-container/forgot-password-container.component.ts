import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-forgot-password-container',
  templateUrl: './forgot-password-container.component.html',
  styleUrls: ['./forgot-password-container.component.css']
})
export class ForgotPasswordContainerComponent {

  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  forgotPassword(email: string): void {
    this.authService.forgotPassword(email).subscribe(
      () => {
        this.snackBar.open("Email for password reset has been sent.", undefined, {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-primary']
        })
      }
    );
  }

}
