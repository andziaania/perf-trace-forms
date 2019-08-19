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
    this.http.get<number[]>(reqUrl).subscribe(); //TODO Usunac
    // let genDateWithTime = (h?: number, m?: number) => { const d = new Date(); if (h) { d.setHours(h); } if (m) { d.setMinutes(m); } return d; };
    // return of(new Array(24).fill(0).map(i => Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1)));
    return of(null);
  }
}
