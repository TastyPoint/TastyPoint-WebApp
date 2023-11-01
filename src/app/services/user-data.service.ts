import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import {Database} from "@angular/fire/database";
import {FirebaseService} from "./firebase/firebase.service";
import {UserCollection} from "../models/user-collection.model";

@Injectable({
  providedIn: 'root'
})
export class UserDataService extends FirebaseService {

  path: string = "users";

  constructor(database: Database) {
    super(database);
  }

  getUserById(userUid: string){
    return this.getDataOnExists(`${this.path}/${userUid}`, data => data as User)
  }

  createUser(uid: string, user: User){
    this.setData(`${this.path}/${uid}`, user);
  }

  getAllUsers(){
    return this.getDataOnExists(this.path, (data) => {
      return this.collectionToArray(data, (key, value) => new UserCollection(key, value as User))
    })
  }

}
