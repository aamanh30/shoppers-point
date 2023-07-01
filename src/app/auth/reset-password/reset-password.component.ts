import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UntypedFormGroup } from '@angular/forms';
import { AuthActions, AuthForm } from '../../auth-state';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { getResetPasswordFieldsConfig } from './reset-password-fields';

@Component({
  selector: 'shoppers-point-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  form: UntypedFormGroup = new UntypedFormGroup({});
  model: AuthForm | undefined;
  fields: FormlyFieldConfig[] = getResetPasswordFieldsConfig(
    this.onResetPassword.bind(this),
    this.onReset.bind(this)
  );

  constructor(private store: Store) {}

  onResetPassword(request: AuthForm & { oldPassword: string }): void {
    this.store.dispatch(AuthActions.resetPassword(request));
  }

  onReset(): void {
    this.form.reset();
  }
}
