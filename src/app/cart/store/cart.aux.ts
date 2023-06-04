import { CartAction } from '../models/cart-action.enum';
import { CartProduct } from '../models/cart-product';

export const toCartProduct = (products: CartProduct[]) =>
  products.reduce(
    (productMap: Map<number, CartProduct>, cartProduct: CartProduct) => {
      let quantity = cartProduct.quantity;
      if (productMap.has(cartProduct.id)) {
        const product: CartProduct = <CartProduct>(
          productMap.get(cartProduct.id)
        );
        quantity += product.quantity;
      }
      productMap.set(cartProduct.id, {
        ...cartProduct,
        quantity
      });

      return productMap;
    },
    new Map([])
  );

export const toProducts = (
  productsMap: Map<number, CartProduct>,
  productId: number,
  action: CartAction
): CartProduct[] => {
  const product = productsMap.get(productId);
  if (product) {
    product.quantity += action === CartAction.increment ? 1 : -1;
  }
  productsMap.set(productId, {
    ...product,
    id: product?.quantity ?? productId,
    quantity: product?.quantity ?? 1
  });

  return Array.from(productsMap.values());
};
