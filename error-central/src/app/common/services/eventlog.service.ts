import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventlogService {

  defaultRequestOpts = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };

  protected _serviceUrl: string = null;
  protected readonly _http: HttpClient;

  constructor(http: HttpClient) {
    this._http = http;
    this._serviceUrl = `${environment.Api.url}/api/EventLog/`;
  }

  public getById<EventLogModel>(id: number): Observable<EventLogModel> {
    return this._http.get<EventLogModel>(this._serviceUrl + id);
  }

  public getAll<EventLogModel>(): Observable<EventLogModel> {
    return this._http.get<EventLogModel>(this._serviceUrl);
  }

  public delete<T>(id: number): Observable<T> {
    return this._http.delete<T>(this._serviceUrl + id, this.defaultRequestOpts);
  }
}
