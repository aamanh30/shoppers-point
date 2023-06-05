import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { CATALOGUE_KEY, catalogueReducer } from './store/catalogue.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CatalogueEffects } from './store/catalogue.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(CATALOGUE_KEY, catalogueReducer),
    EffectsModule.forFeature(CatalogueEffects)
  ]
})
export class CatalogueStateModule {}
