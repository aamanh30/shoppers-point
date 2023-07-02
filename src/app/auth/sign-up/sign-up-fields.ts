export const getSignUpFieldsConfig = (
  onSubmit: Function,
  onReset: Function
) => [
  {
    fieldGroupClassName: 'row',
    fieldGroup: [
      {
        className: 'col-md-6 form-group',
        fieldGroup: [
          {
            key: 'firstName',
            type: 'input',
            props: {
              label: 'First Name',
              placeholder: 'John',
              className: 'form-control',
              required: true
            }
          }
        ]
      },
      {
        className: 'col-md-6 form-group',
        fieldGroup: [
          {
            key: 'lastName',
            type: 'input',
            props: {
              label: 'Last Name',
              placeholder: 'Doe',
              className: 'form-control'
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
        className: 'col-md-6 form-group',
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
      },
      {
        className: 'col-md-6 form-group',
        fieldGroup: [
          {
            key: 'phone',
            type: 'input',
            props: {
              label: 'Mobile No.',
              placeholder: '+91-9876543210',
              className: 'form-control'
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
        className: 'col-md-6 form-group',
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
      },
      {
        className: 'col-md-6 form-group',
        fieldGroup: [
          {
            key: 'confirmPassword',
            type: 'input',
            props: {
              type: 'password',
              label: 'Confirm Password',
              placeholder: '***',
              className: 'form-control'
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
