import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  OnInit,
  signal,
} from '@angular/core';
import { Product } from '@shoppers-point/shared-ui';
import { CartProduct } from '@shoppers-point/cart-state';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'shoppers-point-specifications',
  templateUrl: './specifications.component.html',
  styleUrls: ['./specifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, SharedModule],
})
export class SpecificationsComponent implements OnInit {
  product = input<Product | undefined>();
  quantity = input(1);
  updateCart = output<CartProduct>();
  productQuantity = signal(0);

  ngOnInit(): void {
    this.productQuantity.set(this.quantity());
  }

  onAdd(): void {
    this.productQuantity.update(quantity => quantity + 1);
  }

  onKeyUp(productQty: string): void {
    const quantity = Number(productQty);
    if (isNaN(quantity)) {
      return;
    }
    this.productQuantity.set(quantity);
  }

  onRemove(): void {
    this.productQuantity.update(quantity => quantity - 1);
  }

  onUpdateCart(): void {
    const product = this.product();
    const quantity = this.productQuantity();
    if (!product || quantity <= 0) {
      return;
    }
    this.updateCart.emit({
      ...product,
      quantity,
    });
  }
}
