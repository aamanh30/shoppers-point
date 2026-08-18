import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { Product } from '@shoppers-point/shared-ui';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'shoppers-point-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, SharedModule],
})
export class ProductCardComponent {
  product = input<Product | undefined>();
  addToCart = output<number>();
  addToWishlist = output<number>();
  viewProduct = output<number>();

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
