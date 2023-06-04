import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../shared/models';

@Component({
  selector: 'shoppers-point-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  @Input() products: Product[] = [];
  @Input() productsPerPage: number = 5;
  @Output() addToCart: EventEmitter<number> = new EventEmitter<number>();
  @Output() addToWishlist: EventEmitter<number> = new EventEmitter<number>();
  @Output() viewProduct: EventEmitter<number> = new EventEmitter<number>();
  @Output() productsPerPageChanged: EventEmitter<number> =
    new EventEmitter<number>();

  onAddToCart(id: number): void {
    this.addToCart.emit(id);
  }

  onAddToWishlist(id: number): void {
    this.addToWishlist.emit(id);
  }

  onProductsPerPageChanged(count: number): void {
    this.productsPerPageChanged.emit(count);
  }

  onViewProduct(id: number): void {
    this.viewProduct.emit(id);
  }
}
