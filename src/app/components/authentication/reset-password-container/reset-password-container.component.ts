import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth-service.service";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-reset-password-container',
  templateUrl: './reset-password-container.component.html',
  styleUrls: ['./reset-password-container.component.css']
})
export class ResetPasswordContainerComponent {
  token$: Observable<string | null>;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router,
              private snackBar: MatSnackBar) {
    this.token$ = this.activatedRoute.fragment;
  }

  resetPassword(params: { newPassword: string, token: string }): void {
    let onSuccess = () => {
      this.router.navigate(['login']);
      this.snackBar.open("Password has been reset.", undefined, {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-primary']
      })
    }

    let onError = () => {
      this.snackBar.open("Password could not be changed. Maybe your link was expired.", undefined, {
        duration: 3000,
        panelClass: ['mat-toolbar', 'mat-warn']
      })
    }

    this.authService.resetPassword(params.newPassword, params.token).subscribe(onSuccess, onError);
  }
}
