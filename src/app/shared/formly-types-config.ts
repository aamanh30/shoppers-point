import { TypeOption } from '@ngx-formly/core/lib/models';
import { TypeButtonComponent } from './formly-types/type-button/type-button.component';
import { TypeTextareaComponent } from './formly-types/type-textarea/type-textarea.component';

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
  },
  {
    name: 'textarea',
    component: TypeTextareaComponent,
    wrappers: ['form-field']
  }
];
