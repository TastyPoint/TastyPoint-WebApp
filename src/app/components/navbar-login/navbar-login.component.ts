import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-login',
  templateUrl: './navbar-login.component.html',
  styleUrls: ['./navbar-login.component.css'],
})
export class NavbarLoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  get isLogged(): boolean {
    return this.userService.isLoggedIn;
  }

  navLinks = [
    { route: '/home', label: 'Home' },
    { route: '/inventory', label: 'Products' },
    { route: '/inventory-analytics', label: 'Reports' },
  ];

  logout() {
    this.userService
      .logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => console.log(error));
  }
}
