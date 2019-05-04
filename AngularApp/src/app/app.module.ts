import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import {MatNativeDateModule} from '@angular/material';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './material-module';
import { HttpModule } from '@angular/http';
import {RecaptchaModule} from 'ng-recaptcha';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { routing }        from './app-routing.module';

import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    MatRadioModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    RecaptchaModule.forRoot(),
    routing
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
