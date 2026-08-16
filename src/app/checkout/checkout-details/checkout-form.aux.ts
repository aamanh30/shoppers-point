import { SelectOption } from '@shoppers-point/shared-ui';
import { CheckoutForm } from '@shoppers-point/checkout-state';

export const getCheckoutForm = (): CheckoutForm => ({
  billingAddress: {},
  shippingAddress: {},
  summary: {},
  shippingAddressRequired: false,
});

export const getPaymentOptions = (): SelectOption[] => [
  {
    label: 'Paypal',
    value: 'PAYPAL',
  },
  {
    label: 'Cheque',
    value: 'CHEQUE',
  },
  {
    label: 'Cash',
    value: 'CASH',
  },
  {
    label: 'Bank Transfer',
    value: 'BANKTRANSFER',
  },
];
