import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/model/credentials';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.css']
})
export class LoginContainerComponent {
  loginInvalid = false;

  constructor(private authService: AuthService, private router: Router) { }

  login(credentials: Credentials) {
    this.authService.login(credentials).subscribe(
      data => this.onSuccessfulLogin(),
      (error: HttpErrorResponse) => this.onLoginError(error));
  }

  private onSuccessfulLogin() {
    this.loginInvalid = false;
    this.router.navigate(['groups']);
  }

  private onLoginError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.loginInvalid = true;
    } else {
      alert("Something went wrong, try again.");
    }
  }
}
