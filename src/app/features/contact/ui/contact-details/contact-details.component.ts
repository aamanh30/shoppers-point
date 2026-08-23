import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ContactActions, ContactForm } from 'src/app/features/contact/state';
import { ContactStateModule } from 'src/app/features/contact/state/contact-state.module';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { AddressComponent } from '../address/address.component';
import { FormlyModule } from '@ngx-formly/core';

@Component({
  selector: 'shoppers-point-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    RouterModule,
    ContactStateModule,
    ReactiveFormsModule,
    FormlyModule,
    ContactFormComponent,
    AddressComponent,
  ],
})
export class ContactDetailsComponent {
  readonly #store: Store = inject(Store);

  onContactQuery(query: ContactForm): void {
    this.#store.dispatch(ContactActions.query({ query }));
  }
}
