import { SelectOption } from '../../shared/models/select-option';
import { Country } from '../models/country';

export const toSelectOption = (options: Country[]): SelectOption[] =>
  options.map(option => ({
    label: option.name,
    value: option.code,
  }));
