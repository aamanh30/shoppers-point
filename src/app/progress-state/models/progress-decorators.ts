import { ProgressType } from './progress-type';
import { StartProgress } from './start-progress';
import { StopProgress } from './stop-progress';

export type ProgressDecorators = { progressType: ProgressType } & (
  | StartProgress
  | StopProgress
);
