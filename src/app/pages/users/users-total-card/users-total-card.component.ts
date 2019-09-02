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

  ngOnInit() { }

  ngAfterViewInit() {
    this.refreshTotalData();
  }

  /**
   * Refreshing the chart after input properties change.
   */
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    // getting the value of changed properties
    for (let propName in changes) {
      if (propName === 'timeRange') {
        this.setSelectedTimeRangeActions();
      }
      let changedProp = changes[propName];
      if (!changedProp.isFirstChange()) {
        this.refreshTotalData();
      }
    }
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
        { data: datasetPrev, label: `Previous ${this.timeRange}`}
      ])
    ).subscribe((newData) => this.usersChart.setChartData(newData));
  }


  // event handlers

  handleShowPreviousInRange(isShow: boolean) {
    this.isShowPreviousInTimeRange = !this.isShowPreviousInTimeRange;
    this.usersChart.togglePrevTimeRange();
  }


  // private methods

  private setSelectedTimeRangeActions() {
    for (const timeRangeActionsElement of this.timeRangeActionsTypes) {
      if (timeRangeActionsElement.type === this.timeRange) {
        this.selectedTimeRangeActions = timeRangeActionsElement;
        return;
      }
    }
    console.error('No TIME RANGE defined')
  }

  private calculatePreviousDateByDays(days: number): Date {
    const date = this.date;
    date.setDate(date.getDate() - days);
    return date;
  }


}
