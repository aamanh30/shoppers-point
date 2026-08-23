import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PROGRESS_FEATURE_KEY } from './+store';
import { progressReducer } from './+store/progress.reducer';
import { ProgressEffects } from './+store/progress.effects';

@NgModule({
  imports: [
    CommonModule,
    NgbToastModule,
    StoreModule.forFeature(PROGRESS_FEATURE_KEY, progressReducer),
    EffectsModule.forFeature(ProgressEffects),
  ],
})
export class ProgressStateModule {}
