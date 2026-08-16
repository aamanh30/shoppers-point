import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ContactActions, ContactForm } from '@shoppers-point/contact-state';

@Component({
    selector: 'shoppers-point-contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ContactDetailsComponent {
  constructor(private store: Store) {}
  onContactQuery(query: ContactForm): void {
    this.store.dispatch(ContactActions.placeQuery(query));
  }
}
