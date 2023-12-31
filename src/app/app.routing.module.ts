import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { InventoryTableComponent } from './components/inventory-table/inventory-table.component';


import { canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { RegisterInventoryComponent } from './components/register-inventory/register-inventory.component';
import { UpdateInventoryComponent } from './components/update-inventory/update-inventory.component';
import { InventoryAnatyticsComponent } from './components/inventory-anatytics/inventory-anatytics.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'inventory', component: InventoryTableComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },
    {path: 'home', component: HomeComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },
    {path: 'inventory-analytics', component: InventoryAnatyticsComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
