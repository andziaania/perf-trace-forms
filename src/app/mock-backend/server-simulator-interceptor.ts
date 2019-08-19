import { LoggerService } from '../logger.service';
import { UsersMockService } from './users-mock.service';
import { HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { materialize, delay, dematerialize, mergeMap } from 'rxjs/operators';


const GET_METHOD = 'GET';


@Injectable({
  providedIn: 'root'
})
export class ServerSimulatorInterceptor implements HttpInterceptor {


  constructor(private logger: LoggerService,
     private usersService: UsersMockService) { }

  /**
   * Wraps in delayed observable to simulate server api call.
   * Call materialize and dematerialize to ensure delay even if an error
   * is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.logger.log( 'HTTP mock-backend-interceptor scans request: ', request.url);
    // return next.handle(request);
    return of(null).pipe(
      mergeMap(() => this.rootRequest(request, next)
    ))
    .pipe(materialize())
    .pipe(delay(500))
    .pipe(dematerialize());
  }

  private rootRequest(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let result: any;

    if (request.url.match('\/users\/day\/d+$') && request.method === GET_METHOD) {
      result = this.usersService.genDailyUsersActivity();
    }

    else {
      this.logger.log( 'HTTP mock-backend-interceptor passes throuhg this request: ', request.url);
      return next.handle(request);
    }

    return of(new HttpResponse({ status: 200, body: result }));
  }
}
