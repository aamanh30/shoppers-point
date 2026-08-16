import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormComponent } from './auth-form.component';
import { UntypedFormGroup } from '@angular/forms';

fdescribe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthFormComponent]
    });
    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.formClass).toEqual('');
    expect(component.heading).toEqual('');
    expect(component.form).toBeInstanceOf(UntypedFormGroup);
    expect(component.model).toBeUndefined();
    expect(component.fields).toEqual([]);
  });
});
