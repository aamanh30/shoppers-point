import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UntypedFormGroup } from '@angular/forms';
import { AuthActions, AuthForm } from '@shoppers-point/auth-state';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { getResetPasswordFieldsConfig } from './reset-password-fields';

@Component({
  selector: 'shoppers-point-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class ResetPasswordComponent {
  form: UntypedFormGroup = new UntypedFormGroup({});
  model: AuthForm | undefined;
  fields: FormlyFieldConfig[] = getResetPasswordFieldsConfig(
    this.onResetPassword.bind(this),
    this.onReset.bind(this)
  );
  readonly #store: Store = inject(Store);

  onResetPassword(): void {
    if (this.form.invalid) {
      return;
    }
    this.#store.dispatch(AuthActions.resetPassword(this.form.value));
  }

  onReset(): void {
    this.form.reset();
  }
}
