import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { getContactFormFieldsConfig } from './contact-form-fields';
import { ContactForm } from '../../contact-state';

@Component({
  selector: 'shoppers-point-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  @Input() model: ContactForm | undefined;
  @Output() contactQuery: EventEmitter<ContactForm> =
    new EventEmitter<ContactForm>();
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
