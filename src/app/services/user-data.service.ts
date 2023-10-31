import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private baseUrl = 'https://tastypoint-firebase-default-rtdb.firebaseio.com/users';
  
  constructor(private httpClient: HttpClient) { }

  getUserById(userUid: string){
    return this.httpClient.get(`${this.baseUrl}/${userUid}`);
  }

  createUser(user: User){
    return this.httpClient.post(`${this.baseUrl}`, user);
  }

  getAllUsers(){
    return this.httpClient.get(`${this.baseUrl}`);
  }

}
