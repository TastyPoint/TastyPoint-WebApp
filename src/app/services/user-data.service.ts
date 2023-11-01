import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {FirebaseService} from "./firebase.service";

@Injectable({
  providedIn: 'root'
})
export class UserDataService extends FirebaseService<User>{

  constructor(db: AngularFireDatabase) {
    super("/users", db);
  }

  deleteAll(): Promise<void> {
    return this.items.remove();
  }


}
