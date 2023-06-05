import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../shared/models';

@Component({
  selector: 'shoppers-point-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: Product | undefined;
  @Output() addToCart: EventEmitter<number> = new EventEmitter<number>();
  @Output() addToWishlist: EventEmitter<number> = new EventEmitter<number>();
  @Output() viewProduct: EventEmitter<number> = new EventEmitter<number>();

  get rating() {
    return this.product ? `${this.product.rating?.rate}rem` : '0';
  }

  onAddToCart(id: number): void {
    this.addToCart.emit(id);
  }

  onAddToWishlist(id: number): void {
    this.addToWishlist.emit(id);
  }

  onViewProduct(id: number): void {
    this.viewProduct.emit(id);
  }
}
