import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ContactDetailsComponent } from './contact-details/contact-details.component';

const routes: Route[] = [
  {
    path: '',
    component: ContactDetailsComponent
  }
];

@NgModule({
  declarations: [ContactDetailsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ContactModule {}
