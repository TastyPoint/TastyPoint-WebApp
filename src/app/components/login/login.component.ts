import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup;

  constructor(private userService: UserService, private router: Router, private userDataService: UserDataService){
    
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    })
  }

  ngOnInit(): void {

  }

  onSubmit(){
    this.userService.login(this.formLogin.value)
      .then(response => {
        console.log(response);  
        this.router.navigate(['/home']);
      })
      .catch(error => console.log(error));
  }

  loginGoogle(){
    this.userService.loginWithGoogle()
      .then(response => {
        console.log(response);  
        this.router.navigate(['/home']);
      })
      .catch(error => console.log(error));
  }
}
