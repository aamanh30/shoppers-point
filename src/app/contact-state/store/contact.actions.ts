import { createAction, props } from '@ngrx/store';
import { ContactForm } from '../models/contact-form';

export enum ContactActionTypes {
  PlaceQuery = '[Contact] Place Query',
  PlaceQuerySuccess = '[Contact] Place Query Success',
  ContactError = '[Contact] Contact Error'
}

export const placeQuery = createAction(
  ContactActionTypes.PlaceQuery,
  props<ContactForm>()
);

export const placeQuerySuccess = createAction(
  ContactActionTypes.PlaceQuerySuccess
);

export const contactError = createAction(
  ContactActionTypes.ContactError,
  props<{ error: Partial<Error> }>()
);
