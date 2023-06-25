import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Address } from '../../checkout-state/models';
import { SelectOption } from '../../shared/models';

@Component({
  selector: 'shoppers-point-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent {
  @Input() heading = '';
  @Input() form: UntypedFormGroup = new UntypedFormGroup({});
  @Input() model: Address | undefined;
  get countries() {
    return this.#countries;
  }
  @Input() set countries(countries: SelectOption[]) {
    this.#countries = countries;
    this.fields = this.#getFieldConfig();
  }
  get cities() {
    return this.#cities;
  }
  @Input() set cities(cities: SelectOption[]) {
    this.#cities = cities;
    this.fields = this.#getFieldConfig();
  }
  fields: FormlyFieldConfig[] = [];
  #cities: SelectOption[] = [];
  #countries: SelectOption[] = [];

  #getFieldConfig(): FormlyFieldConfig[] {
    return [
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
                key: 'mobileNumber',
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
                key: 'addressLine1',
                type: 'input',
                props: {
                  label: 'Address Line 1',
                  placeholder: '123 Street',
                  className: 'form-control'
                }
              }
            ]
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
                key: 'country',
                type: 'select',
                props: {
                  className: 'form-control',
                  label: 'Country',
                  options: this.countries,
                  placeholder: 'Country',
                  required: true
                }
              }
            ]
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
                  options: this.cities,
                  placeholder: 'City'
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
                key: 'state',
                type: 'input',
                props: {
                  label: 'State',
                  placeholder: 'State',
                  className: 'form-control'
                }
              }
            ]
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
                  className: 'form-control'
                }
              }
            ]
          }
        ]
      }
    ];
  }
}
