import { Component, Input } from '@angular/core';
import { Product } from '../models';

@Component({
  selector: 'shoppers-point-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  get productsPerPage() {
    return this.#productsPerPage;
  }
  @Input() set productsPerPage(productsPerPage: number) {
    this.#productsPerPage = productsPerPage;
    this.setPages();
  }
  get products() {
    return this.#products;
  }
  @Input() set products(products: Product[]) {
    this.#products = products;
    this.setPages();
  }
  #products: Product[] = [];
  #productsPerPage = 5;
  currentPage = 1;
  pages: number[] = [];

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  setPages(): void {
    this.pages = Array.from(
      new Array(Math.ceil(this.products.length / this.productsPerPage))
    ).map((_, i) => i + 1);
  }
}
