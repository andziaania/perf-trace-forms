import { UsersService } from './../../data-services/users.service';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Observable, zip } from 'rxjs';

import { ChartUsersComponent } from './chart-users/chart-users.component';
import { map } from 'rxjs/operators';


interface TimeRange {
  type: string;
  getUsersActivityMethod$: (date: Date) => Observable<number[]>;
  getPreviousMoment(): Date;
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
      getUsersActivityMethod$: this.users.getDailyUsersActivity,
      getPreviousMoment: () => this.calculatePreviousDateByDays(1),
    }, {
      type: 'Week',
      getUsersActivityMethod$: this.users.getWeeklyUsersActivity,
      getPreviousMoment: () => this.calculatePreviousDateByDays(7),
    }, {
      type: 'Month',
      getUsersActivityMethod$: this.users.getMonthlyUsersActivity,
      getPreviousMoment: () => {
        const date = this.selectedDate;
        date.setMonth(date.getMonth() - 1);
        return date;
      }
    }
  ];

  selectedTimeRange = this.timeRanges[0];

  selectedDate = new Date();

  constructor(private users: UsersService) {
  }

  ngAfterViewInit() {
    this.refreshData();
  }

  /**
   * Calling asynchronously data services of users activity in the current and the previous period
   */
  private refreshData() {
    zip(
      this.selectedTimeRange.getUsersActivityMethod$.call(this.users, this.selectedDate),
      this.selectedTimeRange.getUsersActivityMethod$.call(this.users, this.selectedTimeRange.getPreviousMoment())
    ).pipe(
      map(([datasetCurr, datasetPrev]: [number[], number[]]) => this.usersChart.setChartData([
        { data: datasetCurr, label: `By ${this.selectedDate.toDateString()}`},
        { data: datasetPrev, label: 'Previous'}
      ]))
    ).subscribe();
  }


  // events
  handleSelectedTimeRangeChange(timeRange: string) {
    for (const timeRangeElement of this.timeRanges) {
      if (timeRangeElement.type === timeRange) {
        this.selectedTimeRange = timeRangeElement;
        break;
      }
    }
    this.refreshData();
  }

  handleDateChange(newDate) {
    this.selectedDate = newDate;
    this.refreshData();
  }

  handleShowPreviousInRange(isShow: boolean) {
    this.usersChart.togglePrevTimeRange();
  }


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

  private calculatePreviousDateByDays(days: number): Date {
    const date = this.selectedDate;
    date.setDate(date.getDate() - days);
    return date;
  }
}
