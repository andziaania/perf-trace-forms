import { ChartDataSets } from 'chart.js';
import { UsersService } from './../../data-services/users.service';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Observable, zip } from 'rxjs';

import { ChartUsersComponent } from './chart-users/chart-users.component';
import { map } from 'rxjs/operators';

import { TIME_RANGE } from './time-range';


@Component({
  selector: 'pt-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {

  timeRanges = [TIME_RANGE.DAY, TIME_RANGE.WEEK, TIME_RANGE.MONTH];

  selectedTimeRange = TIME_RANGE.DAY;

  selectedDate = new Date();

  constructor(private users: UsersService) {
  }

  ngAfterViewInit() {
    // this.refreshTotalData();
    // this.refreshNewReturningData();
  }

  /**
   * Calling asynchronously data services of users activity in the current and the previous period
   */
  // private refreshNewReturningData() {
  //   zip(
  //     this.selectedTimeRange.getUsersActivityMethod$.call(this.users, this.selectedDate),
  //     this.selectedTimeRange.getUsersActivityMethod$.call(this.users, this.selectedTimeRange.getPreviousMoment())
  //   ).pipe(
  //     map(([datasetCurr, datasetPrev]: [number[], number[]]) => [
  //       { data: datasetCurr, label: `By ${this.selectedDate.toDateString()}`},
  //       { data: datasetPrev, label: 'Previous'}
  //     ])
  //   ).subscribe((newData) => this.usersChart.setChartData(newData));
  // }



  // events
  // handleSelectedTimeRangeChange(timeRange: string) {
  //   this.selectedTimeRange = timeRange;
    //event emitter


    // for (const timeRangeElement of this.timeRanges) {
    //   if (timeRangeElement.type === timeRange) {
    //     this.selectedTimeRange = timeRangeElement;
    //     break;
    //   }
    // }
    // this.refreshTotalData();
  // }

  handleDateChange(newDate: Date) {
    //event emitter
    this.selectedDate = newDate;
    // this.refreshTotalData();
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
}
