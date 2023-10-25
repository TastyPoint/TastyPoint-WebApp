import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Add material module
import { MaterialModule } from 'shared/material.module';

//Components
import { LoginComponent } from './components/login/login.component';
import { NavbarLoginComponent } from './components/navbar-login/navbar-login.component';
import { FooterLoginComponent } from './components/footer-login/footer-login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterInventoryComponent } from './components/register-inventory/register-inventory.component';
import { UpdateInventoryComponent } from './components/update-inventory/update-inventory.component';

//Firebase
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import {MatListModule} from "@angular/material/list";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarLoginComponent,
    FooterLoginComponent,
    RegisterComponent,
    HomeComponent,
    RegisterInventoryComponent,
    UpdateInventoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    MatListModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
