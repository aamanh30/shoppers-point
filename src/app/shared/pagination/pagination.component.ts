import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models';

@Component({
  selector: 'shoppers-point-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() pages: number[] = [];
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  onPageChanged(page: number): void {
    this.pageChanged.emit(page);
  }
}
