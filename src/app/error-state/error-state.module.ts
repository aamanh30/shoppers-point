import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ERROR_KEY, errorReducer } from './store/error.reducer';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(ERROR_KEY, errorReducer)]
})
export class ErrorStateModule {}
