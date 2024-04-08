import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarComponent } from './component/menubar/menubar.component';
import { AddpersonComponent } from './component/addperson/addperson.component';
import { PersonlistingComponent } from './component/personlisting/personlisting.component';
import { MaterialModule } from './material.module';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LoginComponent } from './component/login/login.component';
import { UserEffect } from './auth/store/user.effects';
import { AppEffects } from './common/store/app.effects';
import { UserReducer } from './auth/store/user.reducer';
import { PERSONreducer } from './person/store/person.reducer';
import { PersonEffects } from './person/store/person.effects';


@NgModule({
  declarations: [
    AppComponent,
    AddpersonComponent,
    PersonlistingComponent,
    LoginComponent,
    MenubarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({user:UserReducer,person: PERSONreducer}),
    EffectsModule.forRoot([UserEffect,AppEffects,PersonEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi:true },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
