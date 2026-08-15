import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { AuthForm } from '@shoppers-point/auth-state';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
    selector: 'shoppers-point-auth-form',
    templateUrl: './auth-form.component.html',
    styleUrls: ['./auth-form.component.scss'],
    standalone: false
})
export class AuthFormComponent {
  @Input() formClass = '';
  @Input() heading = '';
  @Input() form: UntypedFormGroup = new UntypedFormGroup({});
  @Input() model: AuthForm | undefined;
  @Input() fields: FormlyFieldConfig[] = [];
}
