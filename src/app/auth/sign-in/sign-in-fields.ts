export const getSignInFieldsConfig = (
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
        className: 'col btn-row',
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
