import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'shoppers-point-type-textarea',
  templateUrl: './type-textarea.component.html',
  styleUrls: ['./type-textarea.component.scss']
})
export class TypeTextareaComponent extends FieldType {
  onClick(event: Event): void {
    this.props['onClick']?.(event);
  }
}
