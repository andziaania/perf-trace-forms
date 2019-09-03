import { Component, AfterViewInit, ViewChild, Input, OnChanges, SimpleChange } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChartUsersComponent } from '../chart-users/chart-users.component';
import { UsersService } from './../../../data-services/users.service';


interface TimeRangeActions {
  type: string;
  getUsersActivityMethod$: (date: Date) => Observable<number[]>;
  getNewUsersActivityMethod$: (date: Date) => Observable<number[]>;
  getReturningUsersActivityMethod$: (date: Date) => Observable<number[]>;
}

@Component({
  selector: 'pt-users-new-vs-returning-card',
  templateUrl: './users-new-vs-returning-card.component.html',
  styleUrls: ['./users-new-vs-returning-card.component.scss']
})
export class UsersNewVsReturningCardComponent implements AfterViewInit, OnChanges {

  timeRangeActionsTypes: TimeRangeActions[] = [
    {
      type: 'Day',
      getUsersActivityMethod$: this.users.getDailyUsersActivity,
      getNewUsersActivityMethod$: this.users.getDailyNewUsersActivity,
      getReturningUsersActivityMethod$: this.users.getDailyReturningUsersActivity
    }, {
      type: 'Week',
      getUsersActivityMethod$: this.users.getWeeklyUsersActivity,
      getNewUsersActivityMethod$: this.users.getWeeklyNewUsersActivity,
      getReturningUsersActivityMethod$: this.users.getWeeklyReturningUsersActivity
    }, {
      type: 'Month',
      getUsersActivityMethod$: this.users.getMonthlyUsersActivity,
      getNewUsersActivityMethod$: this.users.getMonthlyNewUsersActivity,
      getReturningUsersActivityMethod$: this.users.getMonthlyReturningUsersActivity
    }
  ];

  @Input() date: Date;

  @Input() timeRange: string;

  selectedTimeRangeActions: TimeRangeActions;

  @ViewChild(ChartUsersComponent, {static: false}) usersChart: ChartUsersComponent;

  isShowTotal = true;

  isShowNew = true;
  
  isShowReturning = true;

  constructor(private users: UsersService) { }


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
      this.selectedTimeRangeActions.getNewUsersActivityMethod$.call(this.users, this.date),
      this.selectedTimeRangeActions.getReturningUsersActivityMethod$.call(this.users, this.date)
    ).pipe(
      map(([datasetTotal, datasetNew, datasetReturning]: [number[], number[], number[]]) => [
        { data: datasetTotal, label: `Total`},
        { data: datasetNew, label: `New`},
        { data: datasetReturning, label: `Returning`}
      ])
    ).subscribe((newData) => this.usersChart.setChartData(newData));
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


}
