export const getContactFormFieldsConfig = (onSubmit: Function) => [
  {
    fieldGroupClassName: 'row',
    fieldGroup: [
      {
        className: 'col-12 form-group',
        fieldGroup: [
          {
            key: 'name',
            type: 'input',
            props: {
              placeholder: 'Your Name',
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
        className: 'col-12 form-group',
        fieldGroup: [
          {
            key: 'email',
            type: 'input',
            props: {
              placeholder: 'Your Email',
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
        className: 'col-12 form-group',
        fieldGroup: [
          {
            key: 'subject',
            type: 'input',
            props: {
              placeholder: 'Subject',
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
        className: 'col-12 form-group',
        fieldGroup: [
          {
            key: 'message',
            type: 'textarea',
            props: {
              placeholder: 'Message',
              className: 'form-control',
              required: true,
              rows: 8
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
              text: 'Send Message',
              btnType: 'submit',
              btnClass: 'btn-primary',
              onClick: onSubmit
            }
          }
        ]
      }
    ]
  }
];
