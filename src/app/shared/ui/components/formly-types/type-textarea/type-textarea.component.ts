import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

@Component({
  selector: 'shoppers-point-type-textarea',
  templateUrl: './type-textarea.component.html',
  styleUrls: ['./type-textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, ReactiveFormsModule, FormlyModule],
})
export class TypeTextareaComponent extends FieldType<FieldTypeConfig> {
  onClick(event: Event): void {
    this.props['onClick']?.(event);
  }

  onChange(event: Event): void {
    this.props['onChange']?.(event);
  }

  onKeyUp(event: Event): void {
    this.props['onKeyUp']?.(event);
  }
}
