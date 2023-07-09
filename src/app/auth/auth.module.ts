import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthStateModule } from '../auth-state/auth-state.module';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';

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
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'sign-in'
  }
];

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AuthFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AuthStateModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forChild()
  ]
})
export class AuthModule {}
