import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlStatistics } from '../shared/types/url-statistics';

const URL = '/api/paths';
const PATHS_ORDERED = '/ordered';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  constructor(private httpClient: HttpClient) { }

  getUrlsOrdered(): Observable<UrlStatistics[]> {
    return this.httpClient.get<UrlStatistics[]>(URL + PATHS_ORDERED);
  }
}
