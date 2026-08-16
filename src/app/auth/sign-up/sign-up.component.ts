import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions, AuthForm } from '@shoppers-point/auth-state';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { getSignUpFieldsConfig } from './sign-up-fields';

@Component({
  selector: 'shoppers-point-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class SignUpComponent {
  form: UntypedFormGroup = new UntypedFormGroup({});
  model: AuthForm | undefined;
  fields: FormlyFieldConfig[] = getSignUpFieldsConfig(
    this.onSignUp.bind(this),
    this.onReset.bind(this)
  );
  readonly #store: Store = inject(Store);

  onSignUp(): void {
    if (this.form.invalid) {
      return;
    }
    this.#store.dispatch(AuthActions.signUp(this.form.value));
  }

  onReset(): void {
    this.form.reset();
  }
}
