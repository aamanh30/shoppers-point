import {
  createAction,
  createActionGroup,
  emptyProps,
  props
} from '@ngrx/store';
import { ERROR_KEY } from './error-key';

export const ErrorActions = createActionGroup({
  source: ERROR_KEY,
  events: {
    loadError: props<{ path: string; message?: string }>(),
    clearError: emptyProps()
  }
});
