import { TypeOption } from '@ngx-formly/core/lib/models';
import { TypeButtonComponent } from './formly-types/type-button/type-button.component';

export const types: TypeOption[] = [
  {
    name: 'button',
    component: TypeButtonComponent,
    wrappers: ['form-field'],
    defaultOptions: {
      props: {
        btnType: 'default',
        type: 'button'
      }
    }
  }
];
