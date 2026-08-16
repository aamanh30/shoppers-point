import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ContactForm } from '../models/contact-form';
import { CONTACT_FEATURE_KEY } from './index';

export const { query, queryError, querySuccess } = createActionGroup({
  source: CONTACT_FEATURE_KEY,
  events: {
    query: props<{ query: ContactForm }>(),
    queryError: props<{ error: Partial<Error> }>(),
    querySuccess: emptyProps(),
  },
});
