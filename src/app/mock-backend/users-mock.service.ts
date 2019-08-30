import { Injectable } from '@angular/core';


@Injectable()
export class UsersMockService {

  constructor() { }

  genDailyUsersActivity(): number[] {
    return this.generateStatisticsArray(24);
  }

  genWeeklyUsersActivity(): number[] {
    return this.generateStatisticsArray(7);
  }

  genMonthlyUsersActivity(): number[] {
    return this.generateStatisticsArray(30);
  }

  private generateStatisticsArray(size: number): number[] {
    return new Array(size).fill(0).map(i => Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1));
  }
}
