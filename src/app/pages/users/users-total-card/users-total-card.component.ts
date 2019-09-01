import { Component, AfterViewInit, ViewChild, Input, OnChanges, SimpleChange, OnInit } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChartUsersComponent } from '../chart-users/chart-users.component';
import { UsersService } from './../../../data-services/users.service';


interface TimeRangeActions {
  type: string;
  getUsersActivityMethod$: (date: Date) => Observable<number[]>;
  getPreviousMoment(): Date;
}


@Component({
  selector: 'pt-users-total-card',
  templateUrl: './users-total-card.component.html',
  styleUrls: ['./users-total-card.component.scss']
})
export class UsersTotalComponent implements AfterViewInit, OnChanges, OnInit  {

  timeRangeActionsTypes: TimeRangeActions[] = [
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
        const date = this.date;
        date.setMonth(date.getMonth() - 1);
        return date;
      }
    }
  ];

  @Input() date: Date;

  @Input() timeRange: string;

  selectedTimeRangeActions: TimeRangeActions;

  @ViewChild(ChartUsersComponent, {static: false}) usersChart: ChartUsersComponent;

  isShowPreviousInTimeRange = true;

  // selectedTimeRange = this.timeRanges[0];

  constructor(private users: UsersService) { }

  ngOnInit() {
    this.setSelectedTimeRangeActions();
  }

  ngAfterViewInit() {
    this.refreshTotalData();
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log("ngOnChanges")
    // getting the value of changed properties
    let log: string[] = [];
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        let from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
        this.refreshTotalData();
      }
    }
    console.log(log.join(', '));
  }

  /**
   * Calling asynchronously data services of users activity in the current and the previous period
   */
  public refreshTotalData() {
    zip(
      this.selectedTimeRangeActions.getUsersActivityMethod$.call(this.users, this.date),
      this.selectedTimeRangeActions.getUsersActivityMethod$.call(this.users, this.selectedTimeRangeActions.getPreviousMoment())
    ).pipe(
      map(([datasetCurr, datasetPrev]: [number[], number[]]) => [
        { data: datasetCurr, label: `By ${this.date.toDateString()}`},
        { data: datasetPrev, label: 'Previous'}
      ])
    ).subscribe((newData) => this.usersChart.setChartData(newData));
  }


  public setSelectedTimeRangeActions() {
    console.log(this.timeRange)
    for (const timeRangeActionsElement of this.timeRangeActionsTypes) {
      if (timeRangeActionsElement.type === this.timeRange) {
        this.selectedTimeRangeActions = timeRangeActionsElement;
        break;
      }
      console.error("No TIME RANGE defined")
    }
    // console.log(timeRangeActionsElement);
    // this.refreshTotalData();
  }

  // public handleSelectedTimeRangeChange(timeRange: string) {
  //   for (const timeRangeElement of this.timeRanges) {
  //     if (timeRangeElement.type === timeRange) {
  //       this.selectedTimeRange = timeRangeElement;
  //       break;
  //     }
  //   }
  //   this.refreshTotalData();
  // }

  // event handlers

  handleShowPreviousInRange(isShow: boolean) {
    this.isShowPreviousInTimeRange = !this.isShowPreviousInTimeRange;
    this.usersChart.togglePrevTimeRange();
    console.log(this.isShowPreviousInTimeRange);
  }


  // private methods

  private calculatePreviousDateByDays(days: number): Date {
    const date = this.date;
    date.setDate(date.getDate() - days);
    return date;
  }


}
