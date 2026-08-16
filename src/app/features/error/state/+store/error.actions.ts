import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ERROR_FEATURE_KEY } from './index';

export const { clearError, loadError } = createActionGroup({
  source: ERROR_FEATURE_KEY,
  events: {
    clearError: emptyProps(),
    loadError: props<{ path: string; message?: string }>(),
  },
});
