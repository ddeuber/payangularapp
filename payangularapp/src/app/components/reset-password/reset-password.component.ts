import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css', '../../styles/authentication.card.css']
})
export class ResetPasswordComponent {
  @Input() token: string | null | undefined;
  @Output() changePassword = new EventEmitter<{newPassword: string, token: string}>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(1)]],
    });
  }

  onChangePassword(): void {
    if (this.token) {
      this.changePassword.emit({newPassword: this.form.get("password")!.value, token: this.token});
    } else {
      alert("Something went wrong");
    }
  }
}
