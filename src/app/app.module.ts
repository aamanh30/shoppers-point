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
import { UserModule } from './user/user.module';
import { CART_KEY, cartReducer } from './cart/store/cart.reducer';
import { CartEffects } from './cart/store/cart.effects';

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
    StoreModule.forFeature(CART_KEY, cartReducer),
    EffectsModule.forFeature(CartEffects),
    HttpClientModule,
    SharedModule,
    UserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
