import { getResetPasswordFieldsConfig } from './reset-password-fields';

describe('Reset Password Fields', () => {
  describe('getResetPasswordFieldsConfig', () => {
    const onSubmit = () => {};
    const onReset = () => {};
    expect(getResetPasswordFieldsConfig(onSubmit, onReset)).toEqual([
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
                  label: 'New Password',
                  placeholder: '***',
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
                key: 'confirmPassword',
                type: 'input',
                props: {
                  type: 'password',
                  label: 'Confirm Password',
                  placeholder: '***',
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
            className: 'col form-group btn-row',
            fieldGroup: [
              {
                type: 'button',
                props: {
                  text: 'Submit',
                  btnType: 'submit',
                  btnClass: 'btn-primary',
                  onClick: onSubmit,
                  disabled: true
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
    ]);
  });
});
