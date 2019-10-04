import { Component, AfterViewInit, ViewChild, Input, OnChanges, SimpleChange } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChartUsersComponent } from '../chart-users/chart-users.component';
import { UsersService } from './../../../data-services/users.service';
import { TIME_RANGE } from '../time-range';


interface TimeRangeActions {
  xAxesLabel: string;
  getUsersActivityMethod$: (date: Date) => Observable<number[]>;
  getPreviousMoment(): Date;
}

const PREVIOUS_DATASET_INDEX = 1;


@Component({
  selector: 'pt-users-total-card',
  templateUrl: './users-total-card.component.html',
  styleUrls: ['./users-total-card.component.scss']
})
export class UsersTotalComponent implements AfterViewInit, OnChanges {

  timeRangeActionsTypes = new Map<TIME_RANGE, TimeRangeActions>();

  @Input() date: Date;

  @Input() timeRange: TIME_RANGE;

  selectedTimeRangeActions: TimeRangeActions;

  @ViewChild(ChartUsersComponent, {static: false}) usersChart: ChartUsersComponent;

  isShowPreviousInTimeRange = true;

  constructor(private users: UsersService) {
    this.timeRangeActionsTypes.set(
      TIME_RANGE.DAY, {
        getUsersActivityMethod$: this.users.getDailyUsersActivity,
        getPreviousMoment: () => this.calculatePreviousDateByDays(1),
        xAxesLabel: 'Hour'
      }
    );
    this.timeRangeActionsTypes.set(
      TIME_RANGE.WEEK, {
        getUsersActivityMethod$: this.users.getWeeklyUsersActivity,
        getPreviousMoment: () => this.calculatePreviousDateByDays(7),
        xAxesLabel: 'Day in Week'
      }
    );
    this.timeRangeActionsTypes.set(
      TIME_RANGE.MONTH, {
        getUsersActivityMethod$: this.users.getMonthlyUsersActivity,
        getPreviousMoment: () => this.calculatePreviousMonth(),
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
      this.selectedTimeRangeActions.getUsersActivityMethod$.call(this.users, this.selectedTimeRangeActions.getPreviousMoment())
    ).pipe(
      map(([datasetCurr, datasetPrev]: [number[], number[]]) => [
        { data: datasetCurr, label: `By ${this.date.toDateString()}`},
        { data: datasetPrev, label: `Previous ${this.timeRange}`}
      ])
    ).subscribe((newData) => this.usersChart.setChartData(newData, this.selectedTimeRangeActions.xAxesLabel));
  }


  // event handlers

  handleShowPreviousInRange() {
    this.isShowPreviousInTimeRange = !this.isShowPreviousInTimeRange;
    this.usersChart.toggleChartLine(PREVIOUS_DATASET_INDEX);
  }


  // private methods

  private calculatePreviousDateByDays(days: number): Date {
    const date = new Date(this.date.getTime());
    date.setDate(this.date.getDate() - days);
    return date;
  }

  private calculatePreviousMonth(): Date {
    const date = new Date(this.date.getTime());
    date.setMonth(this.date.getMonth() - 1);
    return date;
  }


}
