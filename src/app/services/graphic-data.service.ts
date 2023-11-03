import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { GraphicData } from '../models/graphic-data.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class GraphicDataService extends FirebaseService<GraphicData> {
  constructor(db: AngularFireDatabase, userService: UserService) {
    const user = userService.getCurrentUser();
    super(`UsersData/${user?.uid}`, db);
  }
}
