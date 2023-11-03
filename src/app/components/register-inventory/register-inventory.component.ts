import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {ProductsService} from "../../services/products.service";
import {Product, ProductCollection} from "../../models/product.model";

export interface CreateItemCallback {
  afterCreate(product: ProductCollection): void
}

@Component({
  selector: 'app-register-inventory',
  templateUrl: './register-inventory.component.html',
  styleUrls: ['./register-inventory.component.css']
})
export class RegisterInventoryComponent {

  @Output() cancelRegister = new EventEmitter<void>();

  formAddProduct: FormGroup;

  @Input({required: true})
  onCreate!:CreateItemCallback

  constructor(private productService: ProductsService){
    this.formAddProduct = new FormGroup({
      productName: new FormControl(),
      entryDate: new FormControl(),
      expirationDate: new FormControl(),
    })
  }

  ngOnInit(): void {

  }

  onSubmit(){
    const product : Product = {
      name: this.formAddProduct.controls["productName"]?.value,
      entryDate: this.formAddProduct.controls["entryDate"]?.value,
      expirationDate: this.formAddProduct.controls["expirationDate"]?.value
    }

    this.onCreate.afterCreate(this.productService.create(product))
  }

  
  onCancel() {
    this.cancelRegister.emit();
  }
  

}
