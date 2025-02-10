import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from '@interceptors/loading.interceptor';
import { TokenInterceptor } from '@interceptors/token.interceptor';
import { NotificationsInterceptor } from '@interceptors/notifications.interceptor';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { TokenService } from '@storages/token.service';
import { SharedModule } from '@shared/shared.module';
import { AuthGuard } from '@core/guards/auth.guard';
import {MatIconModule} from '@angular/material/icon';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { NgxMaskModule } from 'ngx-mask';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskConfig, NgxCurrencyModule } from 'ngx-currency';

registerLocaleData(ptBr);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  allowZero: true,
  nullable: true
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule.forRoot(CustomCurrencyMaskConfig),
    NgxMaskModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NotificationsInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: LOCALE_ID, useValue: 'pt' },
    CookieService,
    TokenService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
