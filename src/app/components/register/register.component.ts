import {Component, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {Subscription} from "../../models/subscription";
import {FormField} from "../../models/form-field";
import { UserDataService } from 'src/app/services/user-data.service';
import { User } from 'src/app/models/user.model';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  data: User = {
    uid: null,
    email: null,
    restaurantName: null,
    phoneNumber: null,
  }

  @ViewChild('registerForm', {static: false})
  registerForm!: NgForm;
  successfulRoute: string = '/home'
  registerFields: FormField[] = [
    {
      label: "Restaurant name",
      field: 'name',
      placeholder: "Restaurant name",
      required: false,
      type: "text",
      value: ""
    },
    {
      label: "Phone Number",
      field: 'number',
      placeholder: "Phone Number",
      required: false,
      type: "text",
      value: ""
    },
    {
      label: "Email",
      field: 'email',
      placeholder: "example@email.com",
      required: true,
      type: "email",
      value: ""
    },
    {
      label: "Password",
      field: 'password',
      placeholder: "******",
      required: true,
      type: "password",
      value: "",
      minLength: 8
    }
  ];

  showSubscription: boolean = false;
  currentSubscription: Subscription = {
    price: 10,
    benefits: [
      "Advertising through the profile",
      "Publication of up to 10 food dishes",
      "Publication of up to 20 individual supplies",
      "Visualization of the virtual reality catalog of your products",
      "Unlimited food plate posting",
      "Unlimited publication of individual supplies",
      "Access to delivery use of the application",
      "Consumer visualization",
      "Consumer’s point of view",
    ]
  };
  acceptSubscription: boolean = false;
  subscriptionCondition: string = "If you accept, you will have to pay the subscription fee to be able to use the application 100%. ";
  credentials: any = {
    email: '',
    password: ''
  }

  constructor(private userService: UserService, private router: Router, private userDataService: UserDataService){

  }



  ngOnInit(): void {
    this.data.email = this.userService.getUserEmail();
    this.data.uid = this.userService.getUserUid();
  }

  validateFields() {
  }

onSubmit(){
    if(this.registerForm.valid) {
      this.credentials.email = this.controlValue("email")
      this.credentials.password = this.controlValue("password")
      this.showSubscription = !this.showSubscription;

      //asignando los datos de restaurantName y phonenumber del formulario
      this.data.restaurantName = this.controlValue("name");
      this.data.phoneNumber = this.controlValue("number");
    }
    console.log(this.acceptSubscription)
  }

  controlValue(controlName: string): string {
    return this.registerForm.controls[controlName].value;
  }

  register() {
    if(this.showSubscription && this.acceptSubscription) {
      this.userService.register(this.credentials)
        .then(response => {
          console.log(response);

          //asignando el uid y el email actual con el esta conectado a la app
          this.data.uid = this.userService.getCurrentUser()?.uid;
          this.data.email = this.userService.getCurrentUser()?.email;

          //Create User
          this.userDataService.create(this.data);
          console.log('Created new user successfully!');

          this.router.navigateByUrl(this.successfulRoute).then();
        })
        .catch(error => console.log(error));
    }
  }

  hasError(field: string, errorCode: string): boolean{ return this.registerForm?.controls[field]?.hasError(errorCode); }
}
