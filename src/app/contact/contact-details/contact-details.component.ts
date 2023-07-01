import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ContactActions, ContactForm } from '../../contact-state';

@Component({
  selector: 'shoppers-point-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent {
  constructor(private store: Store) {}
  onContactQuery(query: ContactForm): void {
    this.store.dispatch(ContactActions.placeQuery(query));
  }
}
