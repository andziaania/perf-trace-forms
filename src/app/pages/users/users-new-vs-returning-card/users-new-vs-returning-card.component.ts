import { Component, AfterViewInit, ViewChild, Input, OnChanges, SimpleChange } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChartUsersComponent } from '../chart-users/chart-users.component';
import { UsersService } from './../../../data-services/users.service';
import { TIME_RANGE } from '../time-range';


interface TimeRangeActions {
  xAxesLabel: string;
  getUsersActivityMethod$: (date: Date) => Observable<number[]>;
  getNewUsersActivityMethod$: (date: Date) => Observable<number[]>;
  getReturningUsersActivityMethod$: (date: Date) => Observable<number[]>;
}

const TOTAL_USERS_DATASET_INDEX = 0;
const NEW_USERS_DATASET_INDEX = 1;
const RETURNING_USERS_DATASET_INDEX = 2;

@Component({
  selector: 'pt-users-new-vs-returning-card',
  templateUrl: './users-new-vs-returning-card.component.html',
  styleUrls: ['./users-new-vs-returning-card.component.scss']
})
export class UsersNewVsReturningCardComponent implements AfterViewInit, OnChanges {

  timeRangeActionsTypes = new Map<TIME_RANGE, TimeRangeActions>();

  @Input() date: Date;

  @Input() timeRange: TIME_RANGE;

  selectedTimeRangeActions: TimeRangeActions;

  @ViewChild(ChartUsersComponent, {static: false}) usersChart: ChartUsersComponent;

  isShowTotal = true;

  isShowNew = true;

  isShowReturning = true;

  constructor(private users: UsersService) {
    this.timeRangeActionsTypes.set(
      TIME_RANGE.DAY, {
        getUsersActivityMethod$: this.users.getDailyUsersActivity,
        getNewUsersActivityMethod$: this.users.getDailyNewUsersActivity,
        getReturningUsersActivityMethod$: this.users.getDailyReturningUsersActivity,
        xAxesLabel: 'Hour'
      }
    );
    this.timeRangeActionsTypes.set(
      TIME_RANGE.WEEK, {
        getUsersActivityMethod$: this.users.getWeeklyUsersActivity,
        getNewUsersActivityMethod$: this.users.getWeeklyNewUsersActivity,
        getReturningUsersActivityMethod$: this.users.getWeeklyReturningUsersActivity,
        xAxesLabel: 'Day in Week'
      }
    );
    this.timeRangeActionsTypes.set(
      TIME_RANGE.MONTH, {
        getUsersActivityMethod$: this.users.getMonthlyUsersActivity,
        getNewUsersActivityMethod$: this.users.getMonthlyNewUsersActivity,
        getReturningUsersActivityMethod$: this.users.getMonthlyReturningUsersActivity,
        xAxesLabel: 'Day in Month'
      }
    );
  }


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
        this.selectedTimeRangeActions = this.timeRangeActionsTypes.get(this.timeRange);
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
    ).subscribe((newData) => this.usersChart.setChartData(newData, this.selectedTimeRangeActions.xAxesLabel));
  }

  // event handlers

  handleShowTotalUsers() {
    this.isShowTotal = !this.isShowTotal;
    this.usersChart.toggleChartLine(TOTAL_USERS_DATASET_INDEX);
  }

  handleShowNewUsers() {
    this.isShowNew = !this.isShowNew;
    this.usersChart.toggleChartLine(NEW_USERS_DATASET_INDEX);
  }

  handleShowReturningUsers() {
    this.isShowReturning = !this.isShowReturning;
    this.usersChart.toggleChartLine(RETURNING_USERS_DATASET_INDEX);
  }

}
