import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { errorReducer } from './store/error.reducer';
import { ERROR_KEY } from './store/error-key';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(ERROR_KEY, errorReducer)]
})
export class ErrorStateModule {}
