import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './presentation/shared/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AppEffects } from './common/store/app.effects';
import { PERSONreducer } from './person/store/person.reducer';
import { PersonEffects } from './person/store/person.effects';
import { PDFREPORTreducer } from './common/store/pdfreport.reducer';
import { PdfReportEffects } from './common/store/pdfreport.effects';
import { KeycloakService } from './auth/keycloak/keycloak.service';
import { NotificationComponent } from './shared/notification/notification.component';
import { notificationFeatureKey, notificationReducer } from './core/state/notification/notification.reducer';
import { NotificationEffects } from './core/state/notification/notification.effects';
import { ConfirmDialogDirective } from './directive/confirm-dialog.directive';
import { NumbersOnlyDirective } from './presentation/shared/directives/numbers-only.directive';
import { ConfirmationDialogComponent } from './presentation/dialog/confirm-dialog/confirm-dialog.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { config } from './infra/api/config';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntlService } from './service/common/custom-paginator-intl.service';
import { SharedModule } from './presentation/shared/shared.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import 'moment/min/locales';
import { IfPermissionDirective } from './directive/if-permission.directive';
import { IfRoleDirective } from './directive/if-role.directive';
import { MenubarComponent } from './presentation/menubar/menubar.component';
import { StudentRegistrationLookupFacade } from './core/state/student-registration-lookup.facade';

export function appInitializerFactory(kcService: KeycloakService, lookupFacade: StudentRegistrationLookupFacade) {
  return () => kcService.init().then(() => lookupFacade.loadAllLookups());
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, config.apiUrl + '/api/v1/translation/messages/', '');
}

// 'L' is the Moment.js token for a Localized Date (e.g., DD/MM/YYYY or MM/DD/YYYY)
export const DYNAMIC_LOCALE_FORMATS = {
  parse: {
    dateInput: 'L', // This forces the parser to use the locale's format
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    ConfirmDialogDirective,
    ConfirmationDialogComponent,
    NotificationComponent,
    IfPermissionDirective,
    IfRoleDirective
  ],
  imports: [
    BrowserModule,
    NgxMaskDirective, NgxMaskPipe,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot({

      person: PERSONreducer
      , pdfreport: PDFREPORTreducer

    }),
    EffectsModule.forRoot([AppEffects, PersonEffects, PdfReportEffects, NotificationEffects]),
    StoreModule.forFeature(notificationFeatureKey, notificationReducer),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [

    provideNgxMask(),
    { provide: MAT_DATE_LOCALE, useValue: navigator.language },
    provideMomentDateAdapter(DYNAMIC_LOCALE_FORMATS),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntlService },
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService, StudentRegistrationLookupFacade],
      useFactory: appInitializerFactory,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
