import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'shoppers-point-type-button',
  templateUrl: './type-button.component.html',
  styleUrls: ['./type-button.component.scss']
})
export class TypeButtonComponent extends FieldType {
  onClick(event: Event): void {
    this.props['onClick']?.(event);
  }
}
