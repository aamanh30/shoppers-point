import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';

import { ProductsTableComponent } from './products-table.component';

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;
  const product = {
    id: 1,
    title: 'Title',
    price: 109.95,
    description: 'Description',
    category: 'category',
    image: 'image.jpg',
    rating: {
      rate: 1,
      count: 1
    },
    quantity: 8
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsTableComponent]
    });
    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.products).toEqual([]);
    expect(component.productSelected).toBeInstanceOf(EventEmitter);
    expect(component.productRemoved).toBeInstanceOf(EventEmitter);
    expect(component.updateCartQuantity).toBeInstanceOf(EventEmitter);
  });

  describe('onProductSelected', () => {
    it('should emit the product id of the selected product', () => {
      spyOn(component.productSelected, 'emit');
      component.onProductSelected(123);

      expect(component.productSelected).toHaveBeenCalledWith(123);
    });
  });

  describe('onReduce', () => {
    it('should emit the product id and quantity when product quantity is reduced', () => {
      spyOn(component.updateCartQuantity, 'emit');
      component.products = [{ ...product }];
      component.onReduce(0);

      expect(component.updateCartQuantity).toHaveBeenCalledWith({
        id: product.id,
        quantity: product.quantity - 1
      });
    });
  });

  describe('onAdd', () => {
    it('should emit the product id and quantity when product quantity is increased', () => {
      spyOn(component.updateCartQuantity, 'emit');
      component.products = [{ ...product }];
      component.onAdd(0);

      expect(component.updateCartQuantity).toHaveBeenCalledWith({
        id: product.id,
        quantity: product.quantity + 1
      });
    });
  });

  describe('onRemove', () => {
    it('should emit the product id when product quantity is removed', () => {
      spyOn(component.productRemoved, 'emit');
      component.products = [{ ...product }];
      component.onRemove(product.id);

      expect(component.productRemoved).toHaveBeenCalledWith(product.id);
    });
  });
});
