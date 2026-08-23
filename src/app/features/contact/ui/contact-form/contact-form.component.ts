import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { getContactFormFieldsConfig } from './contact-form-fields';
import { ContactForm } from 'src/app/features/contact/state';

@Component({
  selector: 'shoppers-point-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  imports: [ReactiveFormsModule, FormlyModule],
})
export class ContactFormComponent {
  model = input<ContactForm | undefined>(undefined);
  contactQuery = output<ContactForm>();
  form: UntypedFormGroup = new UntypedFormGroup({});
  fields: FormlyFieldConfig[] = getContactFormFieldsConfig(
    this.onSubmit.bind(this)
  );

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.contactQuery.emit(this.form.value);
  }
}
