import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UntypedFormGroup } from '@angular/forms';
import { AuthActions, AuthForm } from '../../auth-state';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { getSignInFieldsConfig } from './sign-in-fields';

@Component({
  selector: 'shoppers-point-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  form: UntypedFormGroup = new UntypedFormGroup({});
  model: AuthForm | undefined;
  fields: FormlyFieldConfig[] = getSignInFieldsConfig(
    this.onSignUp.bind(this),
    this.onReset.bind(this)
  );

  constructor(private store: Store) {}

  onSignUp(): void {
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(AuthActions.signIn(this.form.value));
  }

  onReset(): void {
    this.form.reset();
  }
}
