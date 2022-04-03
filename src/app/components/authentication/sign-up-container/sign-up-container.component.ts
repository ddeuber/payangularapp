import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Credentials} from "../../../model/credentials";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up-container',
  templateUrl: './sign-up-container.component.html',
  styleUrls: ['./sign-up-container.component.css']
})
export class SignUpContainerComponent {

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
  }

  signUp(credentials: Credentials): void {
    let onSuccess = () => {
      this.router.navigate(['login']);
      this.snackBar.open("Successfully added user.", undefined, {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-primary']
      });
    }

    let onError = (error: HttpErrorResponse) => {
      this.snackBar.open(error.error.message, undefined, {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-warn']
      })
    }

    this.authService.signUp(credentials).subscribe(
      () => onSuccess(),
      error => onError(error)
    );
  }
}
