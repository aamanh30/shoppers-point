import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { CartStateModule } from './cart-state/cart-state.module';
import { UserStateModule } from './user-state';
import { CatalogueStateModule } from './catalogue-state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    StoreModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !environment.production,
      autoPause: true,
      trace: false,
      traceLimit: 75
    }),
    EffectsModule.forRoot(),
    CartStateModule,
    CatalogueStateModule,
    HttpClientModule,
    SharedModule,
    UserStateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
