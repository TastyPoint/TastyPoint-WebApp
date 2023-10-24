import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { InventoryTableComponent } from './components/inventory-table/inventory-table.component';


import { canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: 'home', component: HomeComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}, 
    {path: 'inventory-table', component: InventoryTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
