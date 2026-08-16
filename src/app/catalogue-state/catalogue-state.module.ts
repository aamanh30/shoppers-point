import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { catalogueReducer } from './store/catalogue.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CatalogueEffects } from './store/catalogue.effects';
import { CATALOGUE_FEATURE_KEY } from './store/index';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(CATALOGUE_FEATURE_KEY, catalogueReducer),
    EffectsModule.forFeature(CatalogueEffects)
  ]
})
export class CatalogueStateModule {}
