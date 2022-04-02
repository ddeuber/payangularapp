import { EventEmitter } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credentials } from 'src/app/model/credentials';
import {EMAIL_REGEX} from "../util/email-util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../styles/authentication.card.css']
})
export class LoginComponent {
  @Input() loginInvalid = false;
  @Output() loginAttempt = new EventEmitter<Credentials>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: [null, [Validators.required, Validators.minLength(1)]],
    });
  }

  login(): void {
    let credentials = { 'email': this.form.get('email')?.value, 'password': this.form.get('password')?.value };
    this.loginAttempt.emit(credentials);
  }
}
