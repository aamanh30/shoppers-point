import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTextareaComponent } from './type-textarea.component';

describe('TypeTextareaComponent', () => {
  let component: TypeTextareaComponent;
  let fixture: ComponentFixture<TypeTextareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeTextareaComponent]
    });
    fixture = TestBed.createComponent(TypeTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
