import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { AuthForm } from '@shoppers-point/auth-state';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shoppers-point-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, FormlyModule, ReactiveFormsModule],
})
export class AuthFormComponent {
  formClass = input('');
  heading = input('');
  form = input<UntypedFormGroup>(new UntypedFormGroup({}));
  model = input<AuthForm | undefined>(undefined);
  fields = input<FormlyFieldConfig[]>([]);
}
