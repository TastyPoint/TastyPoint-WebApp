import {Component, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {Subscription} from "../../models/subscription";
import {FormField} from "../../models/form-field";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @ViewChild('registerForm', {static: false})
  registerForm!: NgForm;
  successfulRoute: string = '/login'
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

  constructor(private userService: UserService, private router: Router){

  }

  ngOnInit(): void {

  }

  validateFields() {
  }

  onSubmit(){
    if(this.registerForm.valid) {
      this.credentials.email = this.controlValue("email")
      this.credentials.password = this.controlValue("password")
      this.showSubscription = !this.showSubscription;
    }
    console.log(this.acceptSubscription)
  }

  controlValue(controlName: string): string { return this.registerForm.controls[controlName].value; }

  register() {
    if(this.showSubscription && this.acceptSubscription) {
      this.userService.register(this.credentials)
        .then(response => {
          console.log(response);
          this.router.navigateByUrl(this.successfulRoute).then();
        })
        .catch(error => console.log(error));
    }
  }

  hasError(field: string, errorCode: string): boolean{ return this.registerForm?.controls[field]?.hasError(errorCode); }
}
