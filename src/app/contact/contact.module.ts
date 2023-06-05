import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AddressComponent } from './address/address.component';

const routes: Route[] = [
  {
    path: '',
    component: ContactDetailsComponent
  }
];

@NgModule({
  declarations: [ContactDetailsComponent, ContactFormComponent, AddressComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ContactModule {}
