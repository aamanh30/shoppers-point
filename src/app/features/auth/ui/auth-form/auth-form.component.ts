import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { AuthForm } from '@shoppers-point/auth-state';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'shoppers-point-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class AuthFormComponent {
  formClass = input('');
  heading = input('');
  form = input<UntypedFormGroup>(new UntypedFormGroup({}));
  model = input<AuthForm | undefined>(undefined);
  fields = input<FormlyFieldConfig[]>([]);
}
