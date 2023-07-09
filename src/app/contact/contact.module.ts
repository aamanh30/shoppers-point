import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AddressComponent } from './address/address.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { ContactStateModule } from '../contact-state/contact-state.module';

const routes: Route[] = [
  {
    path: '',
    component: ContactDetailsComponent
  }
];

@NgModule({
  declarations: [
    ContactDetailsComponent,
    ContactFormComponent,
    AddressComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ContactStateModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forChild()
  ]
})
export class ContactModule {}
