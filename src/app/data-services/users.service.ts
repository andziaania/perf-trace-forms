import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const URL = 'api/perf-trace/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getActiveUsersCount(): Observable<number> {
    return of(324);
  }

  getDailyUsersActivity(date: Date): Observable<number[]> {
    const reqUrl = `${URL}/day/${date.getTime()}`;
    return this.http.get<number[]>(reqUrl);
  }

  getWeeklyUsersActivity(date: Date): Observable<number[]> {
    const reqUrl = `${URL}/week/${date.getTime()}`;
    return this.http.get<number[]>(reqUrl);
  }

  getMonthlyUsersActivity(date: Date): Observable<number[]> {
    const reqUrl = `${URL}/month/${date.getTime()}`;
    return this.http.get<number[]>(reqUrl);
  }
}
