import { Component, ViewChild, Input } from '@angular/core';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

const SECOND_DATASET_INDEX = 1;

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

  lineChartLabels: Label[] = this.generateLabels(24);

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Today' },
    { data: [], label: 'Prev' },
  ];

  constructor() {
  }

  public setChartData(chartData: ChartDataSets[]) {
    this.lineChartData = chartData;
    this.lineChartLabels = this.generateLabels(chartData[0].data.length);

    this.chart.update();
  }

  public togglePrevTimeRange() {
    const isHidden = this.chart.isDatasetHidden(SECOND_DATASET_INDEX);
    this.chart.hideDataset(SECOND_DATASET_INDEX, !isHidden);
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
}
