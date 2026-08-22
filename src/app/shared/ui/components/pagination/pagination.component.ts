import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'shoppers-point-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule],
})
export class PaginationComponent {
  currentPage = input(1);
  pages = input<number[]>([]);
  pageChanged = output<number>();

  onPageChanged(page: number): void {
    this.pageChanged.emit(page);
  }
}
