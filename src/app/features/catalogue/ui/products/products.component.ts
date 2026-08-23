import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  signal,
  input,
  output,
} from '@angular/core';
import { Product } from '@shoppers-point/shared-state';
import { SharedModule } from '@shoppers-point/shared-ui';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'shoppers-point-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, SharedModule, ProductCardComponent],
})
export class ProductsComponent {
  products = input<Product[]>([]);
  pages = input<number[]>([]);
  currentPage = input(1);
  productsPerPage = input(5);
  productsPerPageOptions = input<number[]>([]);
  addToCart = output<number>();
  addToWishlist = output<number>();
  viewProduct = output<number>();
  productsPerPageChanged = output<number>();
  pageChanged = output<number>();
  expanded = signal(false);

  onAddToCart(id: number): void {
    this.addToCart.emit(id);
  }

  onAddToWishlist(id: number): void {
    this.addToWishlist.emit(id);
  }

  onProductsPerPageChanged(count: number): void {
    this.productsPerPageChanged.emit(count);
    this.expanded.set(false);
  }

  onViewProduct(id: number): void {
    this.viewProduct.emit(id);
  }

  onDropdownToggle(): void {
    this.expanded.update(expanded => !expanded);
  }

  onPageChanged(page: number): void {
    this.pageChanged.emit(page);
  }
}
