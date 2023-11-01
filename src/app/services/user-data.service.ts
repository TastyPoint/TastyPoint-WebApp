import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private dbUsers = '/users';

  usersRef: AngularFireList<User>;
  
  constructor(private db: AngularFireDatabase) {
    this.usersRef = this.db.list(this.dbUsers);
  }

  getAll(): AngularFireList<User> {
    return this.usersRef;
  }

  create(user: User): any {
    return this.usersRef.push(user);
  }

  update(id: string, value: any): Promise<void> {
    return this.usersRef.update(id, value);
  }

  delete(id: string): Promise<void> {
    return this.usersRef.remove(id);
  }

  deleteAll(): Promise<void> {
    return this.usersRef.remove();
  }
  

}
