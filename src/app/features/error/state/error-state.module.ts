import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { errorReducer } from './+store/error.reducer';
import { ERROR_FEATURE_KEY } from './+store/index';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ERROR_FEATURE_KEY, errorReducer),
  ],
})
export class ErrorStateModule {}
