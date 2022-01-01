import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginInvalid = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.form.get('email')?.value, this.form.get('password')?.value).subscribe(
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
