import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-inventory',
  templateUrl: './register-inventory.component.html',
  styleUrls: ['./register-inventory.component.css']
})
export class RegisterInventoryComponent {

  formAddProduct: FormGroup;

  constructor(){
    this.formAddProduct = new FormGroup({
      productName: new FormControl(),
      entryDate: new FormControl(),
      expirationDate: new FormControl(),
    })
  }

  ngOnInit(): void {

  }

  onSubmit(){
    
  }

}
