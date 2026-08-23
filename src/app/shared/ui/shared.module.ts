import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { RatingComponent } from './components/rating/rating.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { TypeButtonComponent } from './components/formly-types/type-button/type-button.component';
import { types } from './components/formly-types/config';
import { TypeTextareaComponent } from './components/formly-types/type-textarea/type-textarea.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forChild({
      types,
    }),
    FooterComponent,
    TypeButtonComponent,
    TypeTextareaComponent,
    HeaderComponent,
    NavbarComponent,
    TopbarComponent,
    RatingComponent,
    PaginationComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    RatingComponent,
    PaginationComponent,
  ],
})
export class SharedModule {}
