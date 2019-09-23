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


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getDailyUsersActivity(date: Date): Observable<number[]> {
    const reqUrl = `${URL}/${UTYPE_TOTAL}/${RANGE_DAY}?date=${date.toISOString()}`;
    return this.http.get<number[]>(reqUrl);
  }

  getWeeklyUsersActivity(date: Date): Observable<number[]> {
    const reqUrl = `${URL}/${UTYPE_TOTAL}/${RANGE_WEEK}?date=${date.toISOString()}`;
    return this.http.get<number[]>(reqUrl);
  }

  getMonthlyUsersActivity(date: Date): Observable<number[]> {
    const reqUrl = `${URL}/${UTYPE_TOTAL}/${RANGE_MONTH}?date=${date.toISOString()}`;
    return this.http.get<number[]>(reqUrl);
  }


  getDailyNewUsersActivity(date: Date):  Observable<number[]> {
    const reqUrl = `${URL}/${UTYPE_NEW}/${RANGE_DAY}?date=${date.toISOString()}`;
    return this.http.get<number[]>(reqUrl);
  }
  getWeeklyNewUsersActivity(date: Date):  Observable<number[]> {
    const reqUrl = `${URL}/${UTYPE_NEW}/${RANGE_WEEK}?date=${date.toISOString()}`;
    return this.http.get<number[]>(reqUrl);
  }

  getMonthlyNewUsersActivity(date: Date):  Observable<number[]> {
    const reqUrl = `${URL}/${UTYPE_NEW}/${RANGE_MONTH}?date=${date.toISOString()}`;
    return this.http.get<number[]>(reqUrl);
  }


  getDailyReturningUsersActivity(date: Date):  Observable<number[]> {
    const reqUrl = `${URL}/${UTYPE_RETURNING}/${RANGE_DAY}?date=${date.toISOString()}`;
    return this.http.get<number[]>(reqUrl);
  }

  getWeeklyReturningUsersActivity(date: Date):  Observable<number[]> {
    const reqUrl = `${URL}/${UTYPE_RETURNING}/${RANGE_WEEK}?date=${date.toISOString()}`;
    return this.http.get<number[]>(reqUrl);
  }

  getMonthlyReturningUsersActivity(date: Date):  Observable<number[]> {
    const reqUrl = `${URL}/${UTYPE_RETURNING}/${RANGE_MONTH}?date=${date.toISOString()}`;
    return this.http.get<number[]>(reqUrl);
  }
}
