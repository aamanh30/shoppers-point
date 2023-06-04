import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FullPageLayoutComponent } from './full-page-layout/full-page-layout.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RatingComponent } from './rating/rating.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FullPageLayoutComponent,
    NavbarComponent,
    TopbarComponent,
    RatingComponent,
    PaginationComponent
  ],
  imports: [CommonModule, RouterModule],
  exports: [FullPageLayoutComponent, RatingComponent, PaginationComponent]
})
export class SharedModule {}
