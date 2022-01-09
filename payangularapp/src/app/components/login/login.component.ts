import { EventEmitter } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credentials } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() loginInvalid = false;
  @Output() loginAttempt = new EventEmitter<Credentials>();

  form: FormGroup;

  constructor(private fb: FormBuilder,) {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required, Validators.minLength(1)]],
    });
  }

  login() {
    let credentials = { 'email': this.form.get('email')?.value, 'password': this.form.get('password')?.value };
    this.loginAttempt.emit(credentials);
  }
}
