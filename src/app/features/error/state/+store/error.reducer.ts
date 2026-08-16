import { Action, createReducer, on } from '@ngrx/store';
import { ErrorActions } from './error.actions';
import { CustomError } from '../models/custom-error';
import { toErrorStatus } from '../models/error.aux';
import { ERROR_FEATURE_KEY } from './index';

export interface ErrorState {
  error: CustomError | undefined;
}

export interface ErrorPartialState {
  [ERROR_FEATURE_KEY]: ErrorState;
}
export const initialErrorState: ErrorState = {
  error: undefined,
};

export const reducer = createReducer(
  initialErrorState,
  on(loadError, (state, { message, path }): ErrorState => {
    return {
      ...state,
      error: new CustomError(toErrorStatus(path), message),
    };
  }),
  on(
    clearError,
    (state): ErrorState => ({
      ...state,
      error: undefined,
    })
  )
);

export const errorReducer = (state: ErrorState | undefined, action: Action) =>
  reducer(state, action);
