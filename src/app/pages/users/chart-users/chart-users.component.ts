import { Component, ViewChild, Input } from '@angular/core';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-chart-users',
  templateUrl: './chart-users.component.html',
  styleUrls: ['./chart-users.component.scss']
})
export class ChartUsersComponent {

  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;

  lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: '0',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'now'
          }
        },
      ],
    },
  };

  lineChartColors: Color[] = [
    { //  light
      backgroundColor: 'rgba(255,159,255,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // dark
      backgroundColor: 'rgba(0, 0, 0, 0.0)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];

  lineChartLegend = true;

  lineChartType = 'line';

  lineChartPlugins = [pluginAnnotations];   // for vertical line with current date; defined in lineChartOptions

  lineChartLabels: Label[] = new Array(24).fill('').map((item, index) => index.toString());

  lineChartData: ChartDataSets[] = [
    { label: 'Today' },
    { label: 'Yesterday' },
  ];

  constructor() {
  }

  setChartData(chartData: ChartDataSets[]) {
    this.lineChartData = chartData;
    this.chart.update();
  }

  updateCurrentIndicator() {
    // this.lineChartOptions.annotation.annotations[0].value = new Date().getHours().toString();
  }
  // TODO rozne dla dzien/mies/rok
  refreshCurrentTime() {
    this.lineChartOptions.annotation.annotations[0].value
          = new Date().getHours().toString();
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
