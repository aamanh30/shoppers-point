import { SelectOption } from '@shoppers-point/shared-ui';

export const getOrderSummaryFields = (paymentOptions: SelectOption[]) => [
  {
    fieldGroupClassName: 'row',
    fieldGroup: [
      {
        className: 'col form-group',
        fieldGroup: [
          {
            key: 'paymentType',
            type: 'radio',
            props: {
              label: 'Payment Type',
              name: 'paymentType',
              className: 'form-control',
              required: true,
              options: paymentOptions,
            },
          },
        ],
      },
    ],
  },
];
