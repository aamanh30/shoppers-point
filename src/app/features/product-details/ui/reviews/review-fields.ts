import { FormlyFieldConfig } from '@ngx-formly/core';

export const getReviewFieldsConfig = (
  onSubmit: Function
): FormlyFieldConfig[] => {
  return [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'd-none',
          fieldGroup: [
            {
              key: 'rating.rate',
              props: {
                required: true,
              },
            },
          ],
        },
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col form-group',
          fieldGroup: [
            {
              key: 'message',
              type: 'textarea',
              props: {
                id: 'review',
                type: 'text',
                placeholder: 'Your Review',
                className: 'form-control',
                required: true,
              },
            },
          ],
        },
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col form-group',
          fieldGroup: [
            {
              key: 'name',
              type: 'input',
              props: {
                label: 'Your Name',
                placeholder: 'John Doe',
                className: 'form-control',
                required: true,
              },
            },
          ],
        },
      ],
    },
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
                required: true,
              },
            },
          ],
        },
      ],
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
                text: 'Leave Your Review',
                btnType: 'submit',
                btnClass: 'btn-primary',
                onClick: onSubmit,
              },
            },
          ],
        },
      ],
    },
  ];
};
