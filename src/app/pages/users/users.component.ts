import { UsersService } from './../../data-services/users.service';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

const FIRST_DATASET_INDEX = 0;
const SECOND_DATASET_INDEX = 1;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  lineChartData: ChartDataSets[] = [
    { label: 'Today' },
    { label: 'Yesterday' },
  ];
  lineChartLabels: Label[];
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
  public lineChartColors: Color[] = [
    { // dark
      backgroundColor: 'rgba(77,83,96,1,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { //  light
      backgroundColor: 'rgba(255,159,255,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  lineChartLegend = true;
  lineChartType = 'line';
  lineChartPlugins = [pluginAnnotations];   // for vertical line with current date; defined in lineChartOptions

  @ViewChild(BaseChartDirective, { static: true })  chart: BaseChartDirective;

  constructor(private users: UsersService) {
    this.lineChartLabels = new Array(24).fill('').map((item, index) => index.toString());
  }

  /**
   * CAUTION! Does not update the chart. Only updates the DataSet property.
   * Run chart.update() if you want those data to be refreshed.
   */
  private updateChartDataSets(date: Date, datasetIndex: number) {
    this.users.getDailyUsersActivity(date).subscribe(
      usersActivity => this.lineChartData[datasetIndex].data = usersActivity
    );
  }

  private refreshData() {
    const today = new Date();
    this.updateChartDataSets(today, FIRST_DATASET_INDEX);

    const yesterday = today;
    yesterday.setDate(today.getDate() - 1);
    this.updateChartDataSets(yesterday, SECOND_DATASET_INDEX);

    this.lineChartOptions.annotation.annotations[0].value = new Date().getHours().toString();
    this.chart.update();
  }

  ngOnInit() {
    this.refreshData();
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public hideOne() {
    console.log(this.chart.isDatasetHidden(1))
    const isHidden = this.chart.isDatasetHidden(1);
    console.log(isHidden)
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne() {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }
}
