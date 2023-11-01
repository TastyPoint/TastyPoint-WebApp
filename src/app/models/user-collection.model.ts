import {User} from "./user.model";

export class UserCollection {
  constructor(public uid: string, public user: User) {
  }
}
