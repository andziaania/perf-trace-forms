import { Component, ViewChild, Input } from '@angular/core';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';


@Component({
  selector: 'pt-chart-users',
  templateUrl: './chart-users.component.html',
  styleUrls: ['./chart-users.component.scss']
})
export class ChartUsersComponent {

  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;

  lineChartOptions: (ChartOptions) = {
    responsive: true,
    maintainAspectRatio: false,
    scales:  {
      xAxes: [{
          scaleLabel: {
              display:     true,
              labelString: 'Date'
          }
      }],
      yAxes: [{
        ticks: {
          callback: value => (value % 1 === 0) ? value : undefined ,  // digital scale
        },
        scaleLabel: {
            display:     true,
            labelString: 'Numbe of Users'
        }
      }]
    }
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

  lineChartLegend = {
    labels: {
      fontFamily: '"Lato", sans-serif',
      fontSize: 12,
    }
  };

  lineChartType = 'line';

  lineChartLabels: Label[] = this.generateLabels(24);

    lineChartData: ChartDataSets[] = [
      { data: [], label: 'Today' },
      { data: [], label: 'Prev' },
    ];

  constructor() {
  }

  public setChartData(chartData: ChartDataSets[], newXLabel: string) {
    this.lineChartData = chartData;
    this.lineChartLabels = this.generateLabels(Math.max(chartData[0].data.length, chartData[1].data.length));
    this.changeXAxesLabel(newXLabel);

    this.chart.update();
  }

  public toggleChartLine(datasetIndex: number) {
    const isHidden = this.chart.isDatasetHidden(datasetIndex);
    this.chart.hideDataset(datasetIndex, !isHidden);
  }


  // events
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  private generateLabels(dataSize: number) {
    return new Array(dataSize).fill('').map((item, index) => (index + 1).toString());
  }

  private changeXAxesLabel(newXLabel: string) {
    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales:  {
        xAxes: [{
            scaleLabel: {
                display:     true,
                labelString: newXLabel
            }
        }],
        yAxes: [{
          ticks: {
            callback: value => (value % 1 === 0) ? value : undefined ,  // digital scale
          },
          scaleLabel: {
              display:     true,
              labelString: 'Numbe of Users'
          }
        }]
      }
    };
  }
}
