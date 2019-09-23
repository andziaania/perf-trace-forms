import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = 'api/users';
const UTYPE_TOTAL = 'total';
const UTYPE_NEW = 'new';
const UTYPE_RETURNING = 'returning';
const RANGE_DAY = 'day';
const RANGE_WEEK = 'week';
const RANGE_MONTH = 'month';
const MINUTES = 60;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  // total
  getDailyUsersActivity(date: Date): Observable<number[]> {
    this.correctTimezoneTime(date);
    const reqUrl = `${URL}/${UTYPE_TOTAL}/${RANGE_DAY}?date=${date.toISOString()}`;
    return this.http.get<number[]>(reqUrl);
  }

  getWeeklyUsersActivity(date: Date): Observable<number[]> {
    this.correctTimezoneTime(date);
    const reqUrl = `${URL}/${UTYPE_TOTAL}/${RANGE_WEEK}?date=${date.toISOString()}`;
    return this.http.get<number[]>(reqUrl);
  }

  getMonthlyUsersActivity(date: Date): Observable<number[]> {
    this.correctTimezoneTime(date);
    const reqUrl = `${URL}/${UTYPE_TOTAL}/${RANGE_MONTH}?date=${date.toISOString()}`;
    return this.http.get<number[]>(reqUrl);
  }

  // returning users
  getDailyReturningUsersActivity(date: Date):  Observable<number[]> {
    this.correctTimezoneTime(date);
    const reqUrl = `${URL}/${UTYPE_RETURNING}/${RANGE_DAY}?date=${date.toISOString()}`;
    return this.http.get<number[]>(reqUrl);
  }

  getWeeklyReturningUsersActivity(date: Date):  Observable<number[]> {
    this.correctTimezoneTime(date);
    const reqUrl = `${URL}/${UTYPE_RETURNING}/${RANGE_WEEK}?date=${date.toISOString()}`;
    return this.http.get<number[]>(reqUrl);
  }

  getMonthlyReturningUsersActivity(date: Date):  Observable<number[]> {
    this.correctTimezoneTime(date);
    const reqUrl = `${URL}/${UTYPE_RETURNING}/${RANGE_MONTH}?date=${date.toISOString()}`;
    return this.http.get<number[]>(reqUrl);
  }

  private correctTimezoneTime(date: Date) {
    const offset = date.getTimezoneOffset() / MINUTES;
    date.setHours(-offset);
  }
}
