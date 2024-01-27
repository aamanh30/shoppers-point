import { toStateKey } from '../../shared/utils/state-key.aux';

const { url } = import.meta;

export const AUTH_KEY: '' = <''>toStateKey(url);
