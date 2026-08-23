import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shoppers-point/shared-ui';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr,
} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { CartStateModule } from './features/cart/state/cart-state.module';
import { UserStateModule } from '@shoppers-point/user-state';
import { CatalogueStateModule } from '@shoppers-point/catalogue-state';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthStateModule } from '@shoppers-point/auth-state';
import { ProgressStateModule } from '@shoppers-point/progress-state';
import { AsyncPipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
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
      traceLimit: 75,
    }),
    EffectsModule.forRoot(),
    CartStateModule,
    CatalogueStateModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, {
      name: 'shoppers-point',
      automaticDataCollectionEnabled: true,
    }),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AsyncPipe,
    SharedModule,
    UserStateModule,
    AuthStateModule,
    ProgressStateModule,
  ],
  providers: [provideHttpClient(withXhr(), withInterceptorsFromDi())],
})
export class AppModule {}
