import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  getActiveUsersCount(): Observable<number> {
    return of(324);
  }

  getDailyUsersActivity(date: Date): Observable<number[]> {
    // let genDateWithTime = (h?: number, m?: number) => { const d = new Date(); if (h) { d.setHours(h); } if (m) { d.setMinutes(m); } return d; };
    return of(new Array(24).fill(0).map(i => Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1)));
  }
}
