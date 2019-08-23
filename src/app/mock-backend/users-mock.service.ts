import { Injectable } from '@angular/core';

@Injectable()
export class UsersMockService {

  constructor() { }

  genDailyUsersActivity(): number[] {
    return new Array(24).fill(0).map(i => Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1));
  }

  genWeeklyUsersActivity(): number[] {
    return new Array(7).fill(0).map(i => Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1));
  }

  genMonthlyUsersActivity(): number[] {
    return new Array(30).fill(0).map(i => Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1));
  }
}
