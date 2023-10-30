import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { StockChart } from 'angular-highcharts';
import { chartData } from './data';

@Component({
  selector: 'app-inventory-anatytics',
  templateUrl: './inventory-anatytics.component.html',
  styleUrls: ['./inventory-anatytics.component.css'],
})
export class InventoryAnatyticsComponent implements OnInit {
  chartOptions!: Highcharts.Options;
  chart!: StockChart;

  constructor() {}

  ngOnInit() {
    this.chartOptions = {
      global: {
        useUTC: false,
      },
      lang: {
        rangeSelectorZoom: 'Zoom',
      },
      credits: {
        enabled: false,
      },
      rangeSelector: {
        selected: 1,
        buttons: [
          {
            type: 'day',
            count: 1,
            text: '1D',
          },
          {
            type: 'week',
            count: 1,
            text: '1W',
          },
          {
            type: 'month',
            count: 1,
            text: '1M',
          },
          {
            type: 'all',
            text: 'All',
          },
        ],
      },
      chart: {
        type: 'stock',
      },
      title: {
        text: 'Variación de Temperatura en el Inventario',
      },
      xAxis: {
        type: 'datetime', // Esto indica que las fechas se representarán en el eje X
        min: chartData[0][0], // Fecha de inicio
        max: chartData[chartData.length - 1][0], // Fecha de fin
      },
      yAxis: {
        title: {
          text: 'Temperatura',
        },
      },
      stockTools: {
        gui: {
          enabled: true, // disable the built-in toolbar
        },
      },
      series: [
        {
          name: 'Grados',
          type: 'line',
          data: chartData,
          tooltip: {
            valueDecimals: 2,
            valueSuffix: '°C',
          },
        },
      ],
    };

    this.chart = new StockChart(this.chartOptions); // Crea una instancia de Chart
  }
}
