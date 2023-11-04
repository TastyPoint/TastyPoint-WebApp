import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { initializeApp } from '@angular/fire/app';
import {
  getDatabase,
  query,
  ref,
  onValue,
  Database,
  orderByChild,
  limitToLast,
  orderByKey,
  limitToFirst
} from '@angular/fire/database';
import { User } from 'src/app/models/user.model';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  data: User = {
    uid: null,
    email: null,
    restaurantName: null,
    phoneNumber: null
  };

  warehouse = {
    temperature: 0,
    humidity: 0,
    capacity: 0,
    max_temp: 0,
    min_temp: 0,
    avg_temp: 0,
    max_hum: 0,
    min_hum: 0,
    avg_hum: 0
  };

  ms = {
    danger: 'The warehouse temperature is above the acceptable limit to store food',
    warning: 'The warehouse temperature is close to the limit to store food',
    success: 'The warehouse temperature is below the limit to store food'
  };

  msHm = {
    danger: 'The warehouse humidity is above the acceptable limit to store food',
    warning: 'The warehouse humidity is close to the acceptable limit store food',
    success: 'The warehouse humidity is below the acceptable limit to store food'
  };

  tempIcons = {
    danger: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSnQ11PBlabnP8fLSpllixv-eYZPKjbfwmsJLaZDQeY6MTalRO',
    warning: 'https://www.clipartmax.com/png/middle/226-2260634_temperature-png-room-temperature-icon-png.png',
    success: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEriCj_jk9rVosAQGdT4rHXpyMPW17kKrx2w&usqp=CAU'
  }
  
  tempIcon = this.tempIcons.success;
  tempMs = "";
  humMs = "";

  private database: Database = inject(Database);

  constructor(private userService: UserService, private router: Router) {}

  getData() {
    const userId = this.userService.getUserUid();

    const readingsRef = ref(this.database, 'users/' + userId + '/readings');
    const Reading = query(readingsRef, orderByKey(), limitToLast(1));

    onValue(Reading, snapshot => {
      const readings = snapshot.val();

      if (snapshot.exists()) {
        this.warehouse.temperature = readings[Object.keys(readings)[0]].temperature;
        this.warehouse.humidity = Math.floor(readings[Object.keys(readings)[0]].humidity);
        this.tempMs = this.getTempMessage(this.warehouse.temperature);
        this.humMs = this.getHumMessage(this.warehouse.humidity);
        this.tempIcon = this.getTempIcon(this.warehouse.temperature);
      } else {
        this.warehouse.temperature = 0;
        this.warehouse.humidity = 0;
      }
    });

    
  }

  getMaxTemperature() {
    const userId = this.userService.getUserUid();

    const readingsRef = ref(this.database, 'users/' + userId + '/readings');
    const topReadingTemp = query(readingsRef, orderByChild('temperature'), limitToLast(1));
    const topReadingHumd = query(readingsRef, orderByChild('humidity'), limitToLast(1));

    onValue(topReadingTemp, snapshot => {
      const readings = snapshot.val();

      if (snapshot.exists()) {
        this.warehouse.max_temp = readings[Object.keys(readings)[0]].temperature;
      } else {
        this.warehouse.max_temp = 0;
      }
    });

    onValue(topReadingHumd, snapshot => {
      const readings = snapshot.val();

      if (snapshot.exists()) {
        this.warehouse.max_hum = readings[Object.keys(readings)[0]].humidity;
      } else {
        this.warehouse.max_hum = 0;
      }
    });
  }

  getMinTempAndHum() {
    const userId = this.userService.getUserUid();

    const readingsRef = ref(this.database, 'users/' + userId + '/readings');
    const minReadingTemp = query(readingsRef, orderByChild('temperature'), limitToFirst(1));
    const minReadingHumd = query(readingsRef, orderByChild('humidity'), limitToFirst(1));

    onValue(minReadingTemp, snapshot => {
      const readings = snapshot.val();

      if (snapshot.exists()) {
        this.warehouse.min_temp = readings[Object.keys(readings)[0]].temperature;
      } else {
        this.warehouse.min_temp = 0;
      }
    });

    onValue(minReadingHumd, snapshot => {
      const readings = snapshot.val();

      if (snapshot.exists()) {
        this.warehouse.min_hum = readings[Object.keys(readings)[0]].humidity;
      } else {
        this.warehouse.min_hum = 0;
      }
    });
  }

  calculateAverage() {
    const userId = this.userService.getUserUid();

    const readingsRef = ref(this.database, 'users/' + userId + '/readings');
    const readingsQuery = query(readingsRef, orderByKey());
    // Avg calculation
    onValue(readingsQuery, snapshot => {
      const readings = snapshot.val();

      let sumOfTemps = 0;
      let sumOfHum = 0;
      for (const readingKey in readings) {
        sumOfTemps += readings[readingKey].temperature;
        sumOfHum += readings[readingKey].humidity;
      }

      this.warehouse.avg_temp = Math.floor(sumOfTemps / Object.keys(readings).length);
      this.warehouse.avg_hum = Math.floor(sumOfHum / Object.keys(readings).length);
    });
  }

  getTempMessage(temp: number):string {
    if (temp >= -10 && temp <= 10) {
      return this.ms.success;
    } else if (temp > 10 && temp <= 20) {
      return this.ms.warning;
    } else {
      return this.ms.danger;
    } 
  }
  getHumMessage(hum: number):string {
    if (hum >= 50 && hum <= 55) {
      return this.msHm.success;
    } else if (hum > 55 && hum <= 60) {
      return this.msHm.warning;
    } else {
      return this.msHm.danger;
    } 
  }
  getTempIcon(temp: number): string {
    if (temp >= -10 && temp <= 10) {
      return this.tempIcons.success;
    } else if (temp > 10 && temp <= 20) {
      return this.tempIcons.warning;
    } else {
      return this.tempIcons.danger;
    }
  }
  ngOnInit(): void {
    this.data.uid = this.userService.getUserUid();

    this.getData();
    this.getMaxTemperature();
    this.getMinTempAndHum();
    this.calculateAverage();
  }

  logout() {
    this.userService
      .logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }
}
