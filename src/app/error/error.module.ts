import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDetailsComponent } from './error-details/error-details.component';
import { Route, RouterModule } from '@angular/router';
import { ErrorStateModule } from '../error-state/error-state.module';

const routes: Route[] = [
  {
    path: ':code',
    component: ErrorDetailsComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404'
  }
];

@NgModule({
  declarations: [ErrorDetailsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ErrorStateModule]
})
export class ErrorModule {}
