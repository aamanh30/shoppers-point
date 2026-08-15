import { Progress } from './progress';
import { StartProgressDecorators } from './start-progress-decorators';
import { StopProgressDecorators } from './stop-progress-decorators';

export type ProgressDecorators = (
  | StartProgressDecorators
  | StopProgressDecorators
) &
  Partial<Progress>;
