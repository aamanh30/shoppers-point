import { ProgressType } from './progress-type';

export type StartProgressDecorators = {
  progressActionType: ProgressType.Start;
  cancellable?: boolean;
};
