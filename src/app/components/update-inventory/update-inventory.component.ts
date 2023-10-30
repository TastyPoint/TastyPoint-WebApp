import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-inventory',
  templateUrl: './update-inventory.component.html',
  styleUrls: ['./update-inventory.component.css']
})
export class UpdateInventoryComponent {
  formUpdateProduct: FormGroup;

  constructor(){
    this.formUpdateProduct = new FormGroup({
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
