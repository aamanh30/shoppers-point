import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions, AuthForm } from '../../auth-state';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { getSignUpFieldsConfig } from './sign-up-fields';

@Component({
  selector: 'shoppers-point-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  form: UntypedFormGroup = new UntypedFormGroup({});
  model: AuthForm | undefined;
  fields: FormlyFieldConfig[] = getSignUpFieldsConfig(
    this.onSignUp.bind(this),
    this.onReset.bind(this)
  );

  constructor(private store: Store) {}

  onSignUp(request: AuthForm): void {
    this.store.dispatch(AuthActions.signUp(request));
  }

  onReset(): void {
    this.form.reset();
  }
}
