import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EMAIL_REGEX} from "../../util/email-util";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css', '../../../styles/authentication.card.css']
})
export class ForgotPasswordComponent {
  @Output() forgotPassword = new EventEmitter<string>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
    });
  }

  onSubmit(): void {
    this.forgotPassword.emit(this.form.get("email")!.value);
  }
}
