import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UntypedFormGroup } from '@angular/forms';
import { AuthActions, AuthForm } from '../../auth-state';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { getForgotPasswordFieldsConfig } from './forgot-password-fields';

@Component({
  selector: 'shoppers-point-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  form: UntypedFormGroup = new UntypedFormGroup({});
  model: AuthForm | undefined;
  fields: FormlyFieldConfig[] = getForgotPasswordFieldsConfig(
    this.onForgotPassword.bind(this),
    this.onReset.bind(this)
  );

  constructor(private store: Store) {}

  onForgotPassword(request: AuthForm): void {
    this.store.dispatch(AuthActions.forgotPassword(request));
  }

  onReset(): void {
    this.form.reset();
  }
}
