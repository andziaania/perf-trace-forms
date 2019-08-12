import { Injectable } from '@angular/core';
// import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

import { User } from './datatypes/user';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService { //implements InMemoryDbService {

  createDb() {
    // createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {

    const users: User[] = [
      { id: 100, login: 'anna', password: 'pass'},
      { id: 101, login: 'anna1', password: 'pass1'}
    ];
    const x = [
      { id: 1, login: 'AnnA', password: 'pass'},
      { id: 2, login: 'AnnA1', password: 'pass1'}
    ];

    return {users, x};
  }

  // return this.http.get<boolean>('assets/test.txt', httpOptions)
  // .pipe(
  //   tap(data => console.log(data))
  // );

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(users: Array<User | any>): number {
    return users.length > 0 ? Math.max(...users.map(hero => hero)) + 1 : 100;
  }
}
