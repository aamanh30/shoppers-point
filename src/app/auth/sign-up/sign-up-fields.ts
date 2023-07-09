import { FormControl } from '@angular/forms';

export const getSignUpFieldsConfig = (
  onSubmit: Function,
  onReset: Function
) => [
  {
    fieldGroupClassName: 'row',
    fieldGroup: [
      {
        className: 'col form-group',
        fieldGroup: [
          {
            key: 'email',
            type: 'input',
            props: {
              label: 'E-mail',
              placeholder: 'example@email.com',
              className: 'form-control',
              required: true
            }
          }
        ]
      }
    ]
  },
  {
    fieldGroupClassName: 'row',
    fieldGroup: [
      {
        className: 'col form-group',
        fieldGroup: [
          {
            key: 'password',
            type: 'input',
            props: {
              type: 'password',
              label: 'Password',
              placeholder: '***',
              className: 'form-control',
              required: true,
              minLength: 6
            }
          }
        ]
      }
    ]
  },
  {
    fieldGroupClassName: 'row',
    fieldGroup: [
      {
        className: 'col form-group',
        fieldGroup: [
          {
            key: 'confirmPassword',
            type: 'input',
            props: {
              type: 'password',
              label: 'Confirm Password',
              placeholder: '***',
              className: 'form-control',
              required: true,
              minLength: 6
            },
            validators: {
              passwordValidator: {
                expression: (control: FormControl) =>
                  control?.value &&
                  control?.value === control?.parent?.value?.password
              }
            }
          }
        ]
      }
    ]
  },
  {
    fieldGroupClassName: 'row',
    fieldGroup: [
      {
        className: 'col form-group btn-row',
        fieldGroup: [
          {
            type: 'button',
            props: {
              text: 'Submit',
              btnType: 'submit',
              btnClass: 'btn-primary',
              onClick: onSubmit
            }
          },
          {
            type: 'button',
            props: {
              text: 'Reset',
              btnType: 'reset',
              btnClass: 'btn-secondary',
              onClick: onReset
            }
          }
        ]
      }
    ]
  }
];
