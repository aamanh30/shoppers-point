import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDetailsComponent } from './error-details.component';

describe('ErrorDetailsComponent', () => {
  let component: ErrorDetailsComponent;
  let fixture: ComponentFixture<ErrorDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorDetailsComponent]
    });
    fixture = TestBed.createComponent(ErrorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
