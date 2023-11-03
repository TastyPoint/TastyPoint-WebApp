import { Reading } from './reading.model';

export interface User {
  uid: any;
  email: any;
  restaurantName: any;
  phoneNumber: any;
  readings?: {[key: number]: Reading};
}
