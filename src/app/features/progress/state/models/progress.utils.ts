import { Action } from '@ngrx/store';
import { ProgressType } from './progress-type';
import { StartProgressDecorators } from './start-progress-decorators';
import { StopProgressDecorators } from './stop-progress-decorators';

const isProgressAction = (
  action: Action,
  progressActionType: ProgressType
): boolean => {
  return (
    'progressActionType' in action &&
    action.progressActionType === progressActionType
  );
};

export const isStartProgressAction = (
  action: Action
): action is Action & StartProgressDecorators =>
  isProgressAction(action, ProgressType.Start);

export const isStopProgressAction = (
  action: Action
): action is Action & StopProgressDecorators =>
  isProgressAction(action, ProgressType.Stop);
