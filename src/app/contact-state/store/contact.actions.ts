import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ContactForm } from '../models/contact-form';
import { CONTACT_KEY } from './contact-key';

export const ContactActions = createActionGroup({
  source: CONTACT_KEY,
  events: {
    placeQuery: props<ContactForm>(),
    placeQuerySuccess: emptyProps(),
    contactError: props<{ error: Partial<Error> }>()
  }
});
