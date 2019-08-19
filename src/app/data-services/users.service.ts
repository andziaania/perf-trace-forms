import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'api/perf-trace/users';

  constructor(private http: HttpClient) { }

  getActiveUsersCount(): Observable<number> {
    return of(324);
  }

  getDailyUsersActivity(date: Date): Observable<number[]> {
    const reqUrl = `${this.url}/day/${date.getTime()}`;
    return this.http.get<number[]>(reqUrl);
  }
}
