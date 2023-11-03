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
  limitToFirst,
} from '@angular/fire/database';
import { User } from 'src/app/models/user.model';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  data: User = {
    uid: null,
    email: null,
    restaurantName: null,
    phoneNumber: null,
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
    avg_hum: 0,
  };

  messages = {
    danger: "The warehouse is temperature is above the limit",
    warning: "The warehouse is temperature is close to the limit",
    success: "The warehouse is temperature is below the limit"
  }

  private database: Database = inject(Database);

  constructor(private userService: UserService, private router: Router) {
    console.log('Starting...');
    console.log(this.warehouse.temperature);
  }

  getData() {
    const userId = this.userService.getUserUid();

    //const dbRef = ref(this.database,'UsersData/'+value.userId+'/readings/'+value.timestamp+'/temperature');
    const readingsRef = ref(this.database, 'users/' + userId + '/readings');
    const Reading = query(readingsRef, orderByKey(), limitToLast(1));
    //this.temperatureData = topReadingTemp;

    onValue(Reading, (snapshot) => {
      const readings = snapshot.val();
      console.log('Showing Snapshot');
      if (snapshot.exists()) {
        console.log(snapshot.val());
        this.warehouse.temperature =
          readings[Object.keys(readings)[0]].temperature;
        this.warehouse.humidity = Math.floor(
          readings[Object.keys(readings)[0]].humidity
        );
        console.log(this.warehouse.temperature);
      } else {
        console.log('No data available');
      }

      //this.temperatureData = snapshot.val();
    });

    /* bRef.orderByKey().limitToLast(1).on('child_added', snapshot =>{
      var jsonData = snapshot.toJSON(); // example: {temperature: 25.02, humidity: 50.20, pressure: 1008.48, timestamp:1641317355}
      var temperature = jsonData.temperature;
      var humidity = jsonData.humidity;
      var pressure = jsonData.pressure;
      var timestamp = jsonData.timestamp;
      // Update DOM elements
      tempElement.innerHTML = temperature;
      humElement.innerHTML = humidity;
      presElement.innerHTML = pressure;
      updateElement.innerHTML = epochToDateTime(timestamp);
    }); */
  }

  getMaxTemperature() {
    const userId = this.userService.getUserUid();

    //const dbRef = ref(this.database,'UsersData/'+value.userId+'/readings/'+value.timestamp+'/temperature');
    const readingsRef = ref(this.database, 'users/' + userId + '/readings');
    const topReadingTemp = query(
      readingsRef,
      orderByChild('temperature'),
      limitToLast(1)
    );
    const topReadingHumd = query(
      readingsRef,
      orderByChild('humidity'),
      limitToLast(1)
    );
    //this.temperatureData = topReadingTemp;

    onValue(topReadingTemp, (snapshot) => {
      const readings = snapshot.val();
      console.log('Showing Snapshot max temp');
      if (snapshot.exists()) {
        console.log('Temp Max: ', snapshot.val());
        this.warehouse.max_temp =
          readings[Object.keys(readings)[0]].temperature;
      } else {
        this.warehouse.max_temp = 0;
      }
    });

    onValue(topReadingHumd, (snapshot) => {
      const readings = snapshot.val();
      console.log('Showing Snapshot max hum');
      if (snapshot.exists()) {
        console.log('Hum Max: ', snapshot.val());
        this.warehouse.max_hum = readings[Object.keys(readings)[0]].humidity;
      } else {
        this.warehouse.max_hum = 0;
      }

      //this.temperatureData = snapshot.val();
    });
  }

  getMinTempAndHum() {
    const userId = this.userService.getUserUid();

    //const dbRef = ref(this.database,'UsersData/'+value.userId+'/readings/'+value.timestamp+'/temperature');
    const readingsRef = ref(this.database, 'users/' + userId + '/readings');
    const minReadingTemp = query(
      readingsRef,
      orderByChild('temperature'),
      limitToFirst(1)
    );
    const minReadingHumd = query(
      readingsRef,
      orderByChild('humidity'),
      limitToFirst(1)
    );
    //const topReadingHumd = query(readingsRef, orderByChild('temperature'), limitToLast(1));
    //this.temperatureData = topReadingTemp;

    onValue(minReadingTemp, (snapshot) => {
      const readings = snapshot.val();
      console.log('Showing Snapshot min temp');
      if (snapshot.exists()) {
        console.log('Min Temp: ', snapshot.val());
        this.warehouse.min_temp =
          readings[Object.keys(readings)[0]].temperature;
      } else {
        this.warehouse.min_temp = 0;
      }
    });

    onValue(minReadingHumd, (snapshot) => {
      const readings = snapshot.val();
      console.log('Showing Snapshot min hum');
      if (snapshot.exists()) {
        console.log('Min Hum: ', snapshot.val());
        this.warehouse.min_hum = readings[Object.keys(readings)[0]].humidity;
      } else {
        this.warehouse.min_hum = 0;
      }
    });
  }

  calculateAverage() {
    const userId = this.userService.getUserUid();

    //const dbRef = ref(this.database,'UsersData/'+value.userId+'/readings/'+value.timestamp+'/temperature');
    const readingsRef = ref(this.database, 'users/' + userId + '/readings');
    const readingsQuery = query(readingsRef, orderByKey());
    // Avg calculation
    onValue(readingsQuery, (snapshot) => {
      const readings = snapshot.val();

      let sumOfTemps = 0;
      let sumOfHum = 0;
      for (const readingKey in readings) {
        sumOfTemps += readings[readingKey].temperature;
        sumOfHum += readings[readingKey].humidity;
      }

      this.warehouse.avg_temp = Math.floor(
        sumOfTemps / Object.keys(readings).length
      );
      this.warehouse.avg_hum = Math.floor(
        sumOfHum / Object.keys(readings).length
      );
      console.log('Average Temp: ', this.warehouse.avg_temp);
      console.log('Average Hum: ', this.warehouse.avg_hum);
    });
  }

  // Method to calculate average temperature from all readings

  // Obtener user uuid
  // Obtener ultimo registro de la lista y su temperatura

  ngOnInit(): void {
    this.data.uid = this.userService.getUserUid();
    console.log(this.data.uid);
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
      .catch((error) => console.log(error));
  }
}
