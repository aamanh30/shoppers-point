import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserSelectors, UserFeature } from './user/store';
import { EMPTY, Observable } from 'rxjs';
import { User } from './shared/models';
@Component({
  selector: 'shoppers-point-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$: Observable<User | undefined> = EMPTY;
  constructor(private store: Store<UserFeature.UserPartialState>) {
    this.user$ = this.store.select(UserSelectors.user);
  }
}
