import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UntypedFormGroup } from '@angular/forms';
import { AuthActions, AuthForm } from '@shoppers-point/auth-state';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { getForgotPasswordFieldsConfig } from './forgot-password-fields';

@Component({
  selector: 'shoppers-point-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class ForgotPasswordComponent {
  form: UntypedFormGroup = new UntypedFormGroup({});
  model: AuthForm | undefined;
  fields: FormlyFieldConfig[] = getForgotPasswordFieldsConfig(
    this.#onForgotPassword.bind(this),
    this.#onReset.bind(this)
  );
  readonly #store: Store = inject(Store);

  #onForgotPassword(): void {
    if (this.form.invalid) {
      return;
    }
    this.#store.dispatch(AuthActions.forgotPassword(this.form.value));
  }

  #onReset(): void {
    this.form.reset();
  }
}
