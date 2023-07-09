import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'shoppers-point-type-textarea',
  templateUrl: './type-textarea.component.html',
  styleUrls: ['./type-textarea.component.scss']
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
