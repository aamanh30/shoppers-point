import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './+store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './+store/user.effects';
import { USER_FEATURE_KEY } from './+store/index';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(USER_FEATURE_KEY, userReducer),
    EffectsModule.forFeature(UserEffects),
  ],
})
export class UserStateModule {}
