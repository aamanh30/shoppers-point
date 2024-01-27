import { SelectOption } from 'src/app/shared/models';
import { CheckoutForm } from '../../checkout-state/models';

export const getCheckoutForm = (): CheckoutForm => ({
  billingAddress: {},
  shippingAddress: {},
  summary: {},
  shippingAddressRequired: false
});

export const getPaymentOptions = (): SelectOption[] => [
  {
    label: 'Paypal',
    value: 'PAYPAL'
  },
  {
    label: 'Cheque',
    value: 'CHEQUE'
  },
  {
    label: 'Cash',
    value: 'CASH'
  },
  {
    label: 'Bank Transfer',
    value: 'BANKTRANSFER'
  }
];
