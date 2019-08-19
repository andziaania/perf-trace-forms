import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersMockService {

  constructor() { }

  genDailyUsersActivity(): number[] {
    return new Array(24).fill(0).map(i => Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1));
  }
}
