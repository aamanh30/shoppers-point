import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ContactEffects } from './store/contact.effects';

@NgModule({
  declarations: [],
  imports: [CommonModule, EffectsModule.forFeature(ContactEffects)]
})
export class ContactStateModule {}
