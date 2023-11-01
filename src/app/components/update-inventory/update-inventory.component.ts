import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {ProductCollection} from "../../models/product.model";
import {ProductsService} from "../../services/products.service";

export interface UpdateItemCallback {
  onCancel(): void
  afterUpdated(product: ProductCollection): void
}

@Component({
  selector: 'app-update-inventory',
  templateUrl: './update-inventory.component.html',
  styleUrls: ['./update-inventory.component.css']
})
export class UpdateInventoryComponent implements OnInit {
  formUpdateProduct!: FormGroup;

  @Input({required: true})
  public product!: ProductCollection

  @Input({required: true})
  public onUpdate!: UpdateItemCallback

  constructor(private productsService: ProductsService) {

  }


  ngOnInit(): void {
    this.formUpdateProduct = new FormGroup({
      productName: new FormControl(this.product.item.name),
      entryDate: new FormControl(this.product.item.entryDate),
      expirationDate: new FormControl(this.product.item.expirationDate),
    })
  }

  controlValue(name: string): string {
    return this.formUpdateProduct.controls[name]?.value;
  }

  onSubmit(){
    this.product.item.name = this.controlValue("productName");
    this.product.item.expirationDate = this.controlValue("expirationDate");
    this.product.item.entryDate = this.controlValue("entryDate");

    this.productsService.update(this.product.uid, this.product.item);
    this.onUpdate.afterUpdated(this.product);
  }

  cancel() {
    this.onUpdate.onCancel();
  }
}
