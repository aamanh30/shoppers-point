import { SelectOption } from '@shoppers-point/shared-ui';

export const getAddressFields = (
  countries: SelectOption[],
  cities: SelectOption[]
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
              required: true,
            },
          },
        ],
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
              className: 'form-control',
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
        className: 'col-md-6 form-group',
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
      {
        className: 'col-md-6 form-group',
        fieldGroup: [
          {
            key: 'mobileNumber',
            type: 'input',
            props: {
              label: 'Mobile No.',
              placeholder: '+91-9876543210',
              className: 'form-control',
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
        className: 'col-md-6 form-group',
        fieldGroup: [
          {
            key: 'addressLine1',
            type: 'input',
            props: {
              label: 'Address Line 1',
              placeholder: '123 Street',
              className: 'form-control',
            },
          },
        ],
      },
      {
        className: 'col-md-6 form-group',
        fieldGroup: [
          {
            key: 'addressLine2',
            type: 'input',
            props: {
              label: 'Address Line 2',
              placeholder: '123 Street',
              className: 'form-control',
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
        className: 'col-md-6 form-group',
        fieldGroup: [
          {
            key: 'country',
            type: 'select',
            props: {
              className: 'form-control',
              label: 'Country',
              options: countries,
              placeholder: 'Country',
              required: true,
            },
          },
        ],
      },
      {
        className: 'col-md-6 form-group',
        fieldGroup: [
          {
            key: 'city',
            type: 'select',
            props: {
              className: 'form-control',
              label: 'City',
              options: cities,
              placeholder: 'City',
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
        className: 'col-md-6 form-group',
        fieldGroup: [
          {
            key: 'state',
            type: 'input',
            props: {
              label: 'State',
              placeholder: 'State',
              className: 'form-control',
            },
          },
        ],
      },
      {
        className: 'col-md-6 form-group',
        fieldGroup: [
          {
            key: 'zip',
            type: 'input',
            props: {
              label: 'Zip',
              placeholder: 'Zip Code',
              className: 'form-control',
            },
          },
        ],
      },
    ],
  },
];
