import { createAction, props } from '@ngrx/store';

export enum ErrorActionTypes {
  LoadError = '[Error] Load Error',
  ClearError = '[Error] Clear Error'
}

export const loadError = createAction(
  ErrorActionTypes.LoadError,
  props<{ path: string; message?: string }>()
);

export const clearError = createAction(ErrorActionTypes.ClearError);
