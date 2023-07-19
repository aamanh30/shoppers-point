import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { PROGRESS_KEY, progressReducer } from './store/progress.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProgressEffects } from './store/progress.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(PROGRESS_KEY, progressReducer),
    EffectsModule.forFeature(ProgressEffects)
  ]
})
export class ProgressStateModule {}
