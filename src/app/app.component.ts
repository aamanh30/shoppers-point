import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  DestroyRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { UserSelectors, UserFeature } from '@shoppers-point/user-state';
import {
  EMPTY,
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs';
import { Product, User } from '@shoppers-point/shared-state';
import {
  CartFeature,
  CartProduct,
  CartSelectors,
} from '@shoppers-point/cart-state';
import {
  CatalogueActions,
  CatalogueSelectors,
} from '@shoppers-point/catalogue-state';
import { NavigationEnd, Router } from '@angular/router';
import { AuthActions } from '@shoppers-point/auth-state';
import { ProgressType } from '@shoppers-point/progress-state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'shoppers-point-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AppComponent implements OnInit {
  user$: Observable<User | undefined> = EMPTY;
  wishlist$: Observable<number[] | undefined> = EMPTY;
  products$: Observable<Product[] | undefined> = EMPTY;
  productQuantities$: Observable<number[] | undefined> = EMPTY;
  searchProducts$: Subject<string> = new Subject<string>();
  readonly #store: Store<
    UserFeature.UserPartialState & CartFeature.CartPartialState
  > = inject(
    Store<UserFeature.UserPartialState & CartFeature.CartPartialState>
  );
  readonly #router: Router = inject(Router);
  readonly #destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.user$ = this.#store.select(UserSelectors.user);
    this.wishlist$ = this.#store.select(CartSelectors.wishlist);
    this.products$ = this.#store.select(CatalogueSelectors.searchProducts);
    this.productQuantities$ = this.#store
      .select(CartSelectors.products)
      .pipe(
        map((products: CartProduct[] | undefined) =>
          (products ?? []).map(product => product.quantity)
        )
      );
    this.#store.dispatch(AuthActions.fetchUser());

    this.searchProducts$
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        distinctUntilChanged(),
        debounceTime(300)
      )
      .subscribe(search =>
        this.#store.dispatch(
          CatalogueActions.searchProducts({
            search,
            progressActionType: ProgressType.Start,
          })
        )
      );
    this.#router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe(() => {
        window.scrollTo({
          top: 0,
          left: 0,
        });
      });
  }

  onSignOut(): void {
    this.#store.dispatch(AuthActions.signOut());
  }

  onSearch(search: string | undefined = ''): void {
    if (!search || search.length < 3) {
      return;
    }
    this.searchProducts$.next(search);
  }

  onSelectProduct(productId: number): void {
    this.#store.dispatch(CatalogueActions.clearSearchProducts());
    this.#router.navigate([`/product-details/${productId}`]);
  }
}
