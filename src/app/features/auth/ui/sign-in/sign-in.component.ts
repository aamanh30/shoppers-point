import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UntypedFormGroup } from '@angular/forms';
import { AuthActions, AuthForm } from '@shoppers-point/auth-state';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { getSignInFieldsConfig } from './sign-in-fields';
import { ProgressType } from '@shoppers-point/progress-state';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shoppers-point-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, AuthFormComponent, RouterModule],
})
export class SignInComponent {
  form: UntypedFormGroup = new UntypedFormGroup({});
  model: AuthForm | undefined;
  fields: FormlyFieldConfig[] = getSignInFieldsConfig(
    this.onSignUp.bind(this),
    this.onReset.bind(this)
  );
  readonly #store: Store = inject(Store);

  onSignUp(): void {
    if (this.form.invalid) {
      return;
    }
    this.#store.dispatch(
      AuthActions.signIn({
        ...this.form.value,
        progressType: ProgressType.Start,
      })
    );
  }

  onReset(): void {
    this.form.reset();
  }
}
