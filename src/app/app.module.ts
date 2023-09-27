import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Add material module
import { MaterialModule } from 'shared/material.module';
import { LoginComponent } from './components/login/login.component';
import { NavbarLoginComponent } from './components/navbar-login/navbar-login.component';
import { FooterLoginComponent } from './components/footer-login/footer-login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarLoginComponent,
    FooterLoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
