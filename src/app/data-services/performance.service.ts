import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'api/performance';
const LOADING = 'loading';


@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  constructor(private http: HttpClient) { }

  getPageLoadingStatistics(): Observable<number[]> {
    const reqUrl = `${URL}/${LOADING}`;
    return this.http.get<number[]>(reqUrl);
  }
}
