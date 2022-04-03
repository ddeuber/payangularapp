import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Credentials} from "../../../model/credentials";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EMAIL_REGEX} from "../../util/email-util";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../../../styles/authentication.card.css']
})
export class SignUpComponent {
  @Input() signUpInvalid = false;
  @Output() signUpAttempt = new EventEmitter<Credentials>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: [null, [Validators.required, Validators.minLength(1)]],
    });
  }

  signUp(): void {
    let credentials = { 'email': this.form.get('email')?.value, 'password': this.form.get('password')?.value };
    this.signUpAttempt.emit(credentials);
  }
}
