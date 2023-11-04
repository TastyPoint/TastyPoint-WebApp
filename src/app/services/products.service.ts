import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {UserService} from "./user.service";
import {FirebaseService} from "./firebase.service";
import {Product} from "../models/product.model";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends FirebaseService<Product>{
  constructor(db: AngularFireDatabase, userService: UserService) {
    const user = userService.getCurrentUser();
    super(`products/${user?.uid}`, db)
  }

}
