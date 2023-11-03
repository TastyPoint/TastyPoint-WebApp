import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { StockChart } from 'angular-highcharts';
import { chartData as testData } from './data';
import { GraphicDataCollection } from 'src/app/models/graphic-data.model';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inventory-anatytics',
  templateUrl: './inventory-anatytics.component.html',
  styleUrls: ['./inventory-anatytics.component.css']
})
export class InventoryAnatyticsComponent implements OnInit {
  chartOptions!: Highcharts.Options;
  temperatureChart!: StockChart;
  humidityChart!: StockChart;
  chartData!: GraphicDataCollection;

  temperatureData: number[][] = [];
  humidityData: number[][] = [];

  dataFound: boolean = false;

  private dataSimulationInterval = 5000;

  constructor(private userDataService: UserDataService, private userService: UserService) {}

  async ngOnInit() {
    await this.getGraphicsData();

    if (this.dataFound) {
      this.temperatureChart = this.graphicConfigFactory(
        this.temperatureData,
        'Variación de Temperatura en el Inventario',
        'Grados',
        '°C'
      );

      this.humidityChart = this.graphicConfigFactory(
        this.humidityData,
        'Variación de Humedad en el Inventario',
        'Relative Humidity',
        'RH'
      );

      this.startDataSimulation();
    }
  }

  async getGraphicsData() {
    await this.userDataService.getAll().then(response => {
      const uid = this.userService.getUserUid();

      const readings = Object.values(response.find(user => user.uid === uid)?.item.readings || {});

      if (readings.length) {
        this.dataFound = true;
        readings.forEach(reading => {
          this.temperatureData.push([parseInt(reading.timestamp), reading.temperature]);
          this.humidityData.push([parseInt(reading.timestamp), reading.humidity]);
        });
      }
    });
  }

  startDataSimulation() {
    // Obtener la fecha actual en la zona horaria de Perú (UTC-5)
    const peruTimeZoneOffset = -5 * 60; // UTC-5 en minutos
    const peruDate = Date.now() + peruTimeZoneOffset * 60 * 1000;

    console.log('peru ', peruDate);
    // Utilizar setInterval para agregar datos ficticios cada cierto intervalo
    setInterval(() => {
      const simulatedTimestamp = Date.now() + peruTimeZoneOffset * 60 * 1000;
      const simulatedTemperature = Math.random() * 10 + 20;
      const simulatedHumidity = Math.random() * 20 + 40;

      this.temperatureData.push([simulatedTimestamp, simulatedTemperature]);
      this.humidityData.push([simulatedTimestamp, simulatedHumidity]);

      // Actualizar solo los datos de la serie, sin crear un nuevo gráfico
      if (this.temperatureChart && this.temperatureChart.ref) {
        const series = this.temperatureChart.ref.series[0];
        series.addPoint([simulatedTimestamp, simulatedTemperature], true, series.data.length >= 20); // El tercer argumento limita el número de puntos en la serie
      }
      if (this.humidityChart && this.humidityChart.ref) {
        const series = this.humidityChart.ref.series[0];
        series.addPoint([simulatedTimestamp, simulatedHumidity], true, series.data.length >= 20);
      }
    }, this.dataSimulationInterval);
  }

  updateChartRealTime(updatedData: number[][]) {
    return {
      xAxis: { min: this.temperatureData[0][0], max: this.temperatureData[this.temperatureData.length - 1][0] },
      series: [{ data: this.temperatureData, type: 'line' }]
    };
  }

  graphicConfigFactory(data: number[][], title: string, dataType: string, symbol: string): StockChart {
    this.chartOptions = {
      global: {
        useUTC: false
      },
      lang: {
        rangeSelectorZoom: 'Zoom'
      },
      credits: {
        enabled: false
      },
      rangeSelector: {
        selected: 1,
        buttons: [
          {
            type: 'day',
            count: 1,
            text: '1D'
          },
          {
            type: 'week',
            count: 1,
            text: '1W'
          },
          {
            type: 'month',
            count: 1,
            text: '1M'
          },
          {
            type: 'all',
            text: 'All'
          }
        ]
      },
      chart: {
        type: 'stock'
      },
      title: {
        text: title
      },
      xAxis: {
        type: 'datetime', // Esto indica que las fechas se representarán en el eje X
        min: data[0][0], // Fecha de inicio
        max: data[data.length - 1][0] // Fecha de fin
      },
      yAxis: {
        title: {
          text: dataType
        }
      },
      stockTools: {
        gui: {
          enabled: true // disable the built-in toolbar
        }
      },
      series: [
        {
          name: 'Grados',
          type: 'line',
          data: data,
          tooltip: {
            valueDecimals: 2,
            valueSuffix: symbol
          }
        }
      ]
    };

    return new StockChart(this.chartOptions);
  }
}
