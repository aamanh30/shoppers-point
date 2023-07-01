import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RatingComponent } from './rating/rating.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { TypeButtonComponent } from './formly-types/type-button/type-button.component';
import { types } from './formly-types-config';
import { TypeTextareaComponent } from './formly-types/type-textarea/type-textarea.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    TopbarComponent,
    RatingComponent,
    PaginationComponent,
    TypeButtonComponent,
    TypeTextareaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      types
    })
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    RatingComponent,
    PaginationComponent
  ]
})
export class SharedModule {}
