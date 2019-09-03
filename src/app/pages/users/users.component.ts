import { Component } from '@angular/core';

import { TIME_RANGE } from './time-range';


@Component({
  selector: 'pt-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  timeRanges = [TIME_RANGE.DAY, TIME_RANGE.WEEK, TIME_RANGE.MONTH];

  selectedTimeRange = TIME_RANGE.DAY;

  selectedDate = new Date();

  constructor() {
  }


  // }


}
