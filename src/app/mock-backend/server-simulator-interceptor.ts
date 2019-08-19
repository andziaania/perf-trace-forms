import { LoggerService } from '../logger.service';
import { UsersMockService } from './users-mock.service';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { materialize, delay, dematerialize, mergeMap } from 'rxjs/operators';


const GET_METHOD = 'GET';


@Injectable()
export class ServerSimulatorInterceptor implements HttpInterceptor {


  constructor(private usersService: UsersMockService) { }

  /**
   * Wraps in delayed observable to simulate server api call.
   * Call materialize and dematerialize to ensure delay even if an error
   * is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`HTTP mock-backend-interceptor scans request: : ${request.url}`);
    // return next.handle(request);
    return of(null)
    .pipe(mergeMap(() => rootRequest()))
    .pipe(materialize())
    .pipe(delay(500))
    .pipe(dematerialize());

    function rootRequest(): Observable<HttpEvent<any>> {
      const { url, method, headers, body } = request;
      let result: any;

      switch (true) {
        case url.match(/\/users\/day\/\d+$/) && method === GET_METHOD:
          // result = this.usersService.genDailyUsersActivity();
          result = [12,12,423,453]
          break;
        default:
          console.log(`passes throuhg this request: ${request.url}`);
          return next.handle(request);
      }

      return of(new HttpResponse({ status: 200, body: result }));
    }

  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: ServerSimulatorInterceptor,
  multi: true
};
