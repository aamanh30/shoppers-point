import { getForgotPasswordFieldsConfig } from './forgot-password-fields';

describe('Forgot Password Fields', () => {
  describe('getForgotPasswordFieldsConfig', () => {
    const onSubmit = () => {};
    const onReset = () => {};
    expect(getForgotPasswordFieldsConfig(onSubmit, onReset)).toEqual([
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12 form-group',
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
