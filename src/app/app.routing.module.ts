import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

import { canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { RegisterInventoryComponent } from './components/register-inventory/register-inventory.component';
import { UpdateInventoryComponent } from './components/update-inventory/update-inventory.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'login'}, 
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },
    {path: 'register-inventory', component: RegisterInventoryComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login'])) },
    {path: 'update-inventory', component: UpdateInventoryComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login'])) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
