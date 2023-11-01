import {AfterViewChecked, AfterViewInit, Component, ViewChild} from '@angular/core';
import {AbstractControl, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {Subscription} from "../../models/subscription";
import {FormField} from "../../models/form-field";
import { UserDataService } from 'src/app/services/user-data.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {

  data: User = {
    email: "",
    restaurantName: "",
    phoneNumber: "",
  }

  @ViewChild('registerForm', {static: false})
  registerForm!: NgForm;
  successfulRoute: string = '/login'
  isRegistering: boolean = false;

  registerFields: FormField[] = [
    {
      label: "Restaurant name",
      field: 'name',
      placeholder: "Restaurant name",
      required: false,
      type: "text",
      value: "",
      validators: [
        Validators.pattern(/[A-z0-9 _]+/)
      ]
    },
    {
      label: "Phone Number",
      field: 'number',
      placeholder: "Phone Number",
      required: false,
      type: "text",
      value: "",
      validators: [
        Validators.pattern(/9[0-9]{8}/)
      ]
    },
    {
      label: "Email",
      field: 'email',
      placeholder: "example@email.com",
      required: true,
      type: "email",
      value: "",
      validators: [
        Validators.email
      ]
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

  ngAfterViewInit(): void {
    for(let field of this.registerFields) {
      if(field.validators != undefined)
        this.registerForm.controls[field.field]?.addValidators(field.validators)
    }
  }


  validateFields() {
  }

  onSubmit(){
    if(this.registerForm.valid) {
      this.credentials.email = this.controlValue("email")
      this.credentials.password = this.controlValue("password")
      this.showSubscription = !this.showSubscription;

      this.data.email = this.controlValue("email");
      this.data.restaurantName = this.controlValue("name");
      this.data.phoneNumber = this.controlValue("number");
    }
  }

  controlValue(controlName: string): string { return this.registerForm.controls[controlName].value; }

  register() {
    if(this.showSubscription && this.acceptSubscription) {
      this.isRegistering = true;
      this.userService.register(this.credentials)
        .then(response => {
          this.userDataService.createUser(response.user.uid, this.data);
          this.isRegistering = false;
          this.router.navigateByUrl(this.successfulRoute).then();
        })
        .catch(error => {
          console.log(error)
          this.isRegistering = false;
        });
    }
  }

  hasError(field: string, errorCode: string): boolean{ return this.registerForm?.controls[field]?.hasError(errorCode); }
}
