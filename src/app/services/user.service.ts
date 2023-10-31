import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider} from '@angular/fire/auth';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private auth: Auth ) { }

  register({ email, password}: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password}: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(){
    return signOut(this.auth);
  }

  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }


  getUserEmail(){
    return this.auth.currentUser?.email;
  }

  getUserUid(){
    return this.auth.currentUser?.uid;
  }

  getCurrentUser(): User | null {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      const { uid, email } = currentUser;
      return { uid, email, restaurantName: null, phoneNumber: null};
    }
    return null;
  }

}
