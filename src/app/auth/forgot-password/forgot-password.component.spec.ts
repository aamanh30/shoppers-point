import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Store } from '@ngrx/store';

import { ForgotPasswordComponent } from './forgot-password.component';
import { AuthActions } from 'src/app/auth-state';

const formlyField = (
  fields: FormlyFieldConfig[],
  key: 'email' | 'reset' | 'submit'
) =>
  fields
    .flatMap(field => field.fieldGroup)
    .flatMap(field => field?.fieldGroup ?? [])
    .find(field => field.key === key || field.props?.['btnType'] === key);

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let mockStore: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent]
    });
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    mockStore = TestBed.inject(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeInstanceOf(UntypedFormGroup);
    expect(component.model).toBeUndefined();

    expect(formlyField(component.fields, 'email')).toEqual({
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
    });
  });

  describe('reset button', () => {
    it('should reset the form', () => {
      const resetButton = formlyField(component.fields, 'reset');
      component.form.patchValue({ email: 'test@test.com' });
      resetButton?.props?.click?.(resetButton);

      expect(component.form.value).toEqual({ email: null });
    });
  });

  describe('submit button', () => {
    const submitButton = formlyField(component.fields, 'submit');
    it('should dispatch the forgot password action if the form is valid', () => {
      spyOn(mockStore, 'dispatch');
      component.form.patchValue({ email: 'test@test.com' });
      submitButton?.props?.click?.(submitButton);

      expect(mockStore.dispatch).toHaveBeenCalledWith(
        AuthActions.forgotPassword(component.form.value)
      );
    });

    it('should not dispatch any actions if the form is invalid', () => {
      component.form.reset();
      submitButton?.props?.click?.(submitButton);

      expect(mockStore.dispatch).not.toHaveBeenCalled();
    });
  });
});
