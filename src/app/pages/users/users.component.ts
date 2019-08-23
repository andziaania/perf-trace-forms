import { UsersService } from './../../data-services/users.service';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartDataSets } from 'chart.js';

import { ChartUsersComponent } from './chart-users/chart-users.component';


const FIRST_DATASET_INDEX = 0;
const SECOND_DATASET_INDEX = 1;

interface TimeRange {
  type: string;
  serviceMethod: (date: Date) => Observable<number[]>;
  getCurrentMoment(): string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {

  @ViewChild(ChartUsersComponent, {static: false}) usersChart: ChartUsersComponent;

  timeRanges: TimeRange[] = [
    {
      type: 'Day',
      serviceMethod: this.users.getDailyUsersActivity,
      getCurrentMoment: () => new Date().getHours().toString()
    }, {
      type: 'Week',
      serviceMethod: this.users.getWeeklyUsersActivity,
      getCurrentMoment: () => new Date().getDay().toString()
    }, {
      type: 'Month',
      serviceMethod: this.users.getMonthlyUsersActivity,
      getCurrentMoment: () => new Date().getDay().toString()
    }
  ];
  selectedTimeRange = this.timeRanges[0];

  constructor(private users: UsersService) {
  }

  ngAfterViewInit() {
    this.refreshData(this.users.getDailyUsersActivity);
  }

  private refreshData(timeRangeMethod: (date: Date) => Observable<number[]>) {
    const today = new Date();
    // this.updateChartDataSets(today, FIRST_DATASET_INDEX);

    // const yesterday = today;
    // yesterday.setDate(today.getDate() - 1);
    // this.updateChartDataSets(yesterday, SECOND_DATASET_INDEX);

    // uzyc mergeMap dla zapytan teraz i poprzedni/

    timeRangeMethod.call(this.users, today).subscribe(
      usersActivity => this.usersChart.setChartData([{data: usersActivity, label: 'labela'},])
    );
  }


  // events
  changeSelectedTimeRange(timeRange: string) {
    for (let timeRangeElement of this.timeRanges) {
      if (timeRangeElement.type === timeRange) {
        this.refreshData(timeRangeElement.serviceMethod);
        break;
      }
    }
  }

  // // events

  // public hideOne() {
  //   console.log(this.chart.isDatasetHidden(1))
  //   const isHidden = this.chart.isDatasetHidden(1);
  //   console.log(isHidden)
  //   this.chart.hideDataset(1, !isHidden);
  // }

  // public pushOne() {
  //   this.lineChartData.forEach((x, i) => {
  //     const num = this.generateNumber(i);
  //     const data: number[] = x.data as number[];
  //     data.push(num);
  //   });
  //   this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  // }

  // public changeColor() {
  //   this.lineChartColors[2].borderColor = 'green';
  //   this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  // }

  // public changeLabel() {
  //   this.lineChartLabels[2] = ['1st Line', '2nd Line'];
  //   // this.chart.update();
  // }
}
