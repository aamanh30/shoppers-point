import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Route[] = [
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'sign-in'
  }
];

@NgModule({
  declarations: [SignUpComponent, SignInComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AuthModule {}
