import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';

import {User} from './datatypes/user';

const URL = 'api/users/';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  isLoginExists(login: string) {
// this.isXLoginExists().subscribe();

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/text' })
    };

    return this.http.get<User[]>(`${URL}?login=${login}`)
        .pipe(
          tap(data => console.log(data.length)),
          map(logins => logins.filter(record => record.login === login)),
          map(arr => arr.length > 0 ? true : false),
          tap(data => console.log(data))
        );
    // return this.http.get<User>(`${URL} + "?login=" + ${login}`)
    //     .pipe(
    //       tap(data => console.log(data))
    //     );
  }

  // isXLoginExists() {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/text' })
  //   };
  //   return this.http.get('api/x')
  //       .pipe(
  //         tap(data => console.log(data))
  //       );
  // }
}
