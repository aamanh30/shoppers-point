import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UserStateModule } from '../user-state';

@NgModule({
  declarations: [],
  imports: [CommonModule, UserStateModule, SharedModule]
})
export class UserModule {}
