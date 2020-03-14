import { Component, OnInit } from '@angular/core';
import { MapChart, Chart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';


declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pak-covid19-client';
  map: MapChart = null;
  pchart: Chart = null;
  tchart: Chart = null;
  constructor(private http: HttpClient) { }
  
  ngOnInit() {
    const pkMapData = require('@highcharts/map-collection/countries/pk/pk-all.geo.json');
    this.draw(pkMapData);
    this.generateProvinceStatsDonut();
    this.generateTrovinceStatsDonut();
  }

  generateTrovinceStatsDonut() {
    this.tchart = new Chart({
      chart: {
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: 'Outcomes'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          shadow: false,
          center: ['50%', '50%'],
          size: '45%',
          innerSize: '20%'
        }
      },
      series: [{
        type: 'pie',
        name: 'Browser share',
        data: [
          ['Samples Tested', 609],
          ['Negative', 581],
          ['Positive', 27],
  
        ]
      }]
    });
  }
  
  generateProvinceStatsDonut() {
    this.pchart = new Chart({
      chart: {
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: 'Infection State'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          shadow: false,
          center: ['50%', '50%'],
          size: '45%',
          innerSize: '20%'
        }
      },
      series: [{
        type: 'pie',
        name: 'Browser share',
        data: [
          ['Islamabad', 1.0],
          ['Punjab', 0],
          ['Khyber Pakhtunkhwa', 0],
          ['Balochistan', 6],
          ['Azad Jammu and Kashmir', 0],
          ['Gilgit Baltistan', 31]
        ]
      }]
    });
  }
  
  draw(pkMapData) {
    console.log('pkMapData', pkMapData);
    const data: any = [
      ['pk-sd', 0],
      ['pk-ba', 1],
      ['pk-jk', 2],
      ['pk-na', 3],
      ['pk-nw', 4],
      ['pk-ta', 5],
      ['pk-is', 6],
      ['pk-pb', 7]
    ];
    const series: any = [
      {
        data,
        name: 'Random data',
        states: {
          hover: {
            color: '#BADA55'
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        }
      }
    ];
    this.map = new MapChart({
      chart: {
        map: pkMapData,
      },
      title: {
        text: 'Highmaps basic demo'
      },
      subtitle: {
        text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/pk/pk-all.js">Pakistan</a>'
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },
      colorAxis: {
        min: 0
      },
      series
    });
  }
  
}