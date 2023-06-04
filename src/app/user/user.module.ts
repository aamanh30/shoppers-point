import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { USER_KEY, userReducer } from './store/user.reducer';
import { UserEffects } from './store/user.effects';
import { MyAccountComponent } from './my-account/my-account.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MyAccountComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(USER_KEY, userReducer),
    EffectsModule.forFeature(UserEffects),
    SharedModule
  ]
})
export class UserModule {}
