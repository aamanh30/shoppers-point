import { Progress } from './progress';
import { ProgressType } from './progress-type';

export type StopProgressDecorators = Progress & {
  progressActionType: ProgressType.Stop;
};
