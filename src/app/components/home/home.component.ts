import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private userService: UserService, private router: Router, private userDataService: UserDataService){

  }

  ngOnInit(): void {
    
  }

  logout(){
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

}
