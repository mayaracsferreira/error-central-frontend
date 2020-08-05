import { EventLogModel } from './../models/event-log-model';
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
      'Authorization': 'bearer ' + JSON.parse(localStorage.getItem('currentUser')).accessToken
    }),
  }; 

  protected _serviceUrl: string = null;
  protected readonly _http: HttpClient;

  constructor(http: HttpClient) {
    this._http = http;
    this._serviceUrl = `${environment.Api.url}/api/EventLog/`;
  }

  public getById<EventLogModel>(id: number): Observable<EventLogModel> {
    return this._http.get<EventLogModel>(this._serviceUrl + id, this.defaultRequestOpts);
  }

  public getEventGrouping<EventLogModel>(environment: string = '', orderBy: string = '', searchFor : string = '', field: string = ''): Observable<EventLogModel> {
    return this._http.get<EventLogModel>(this._serviceUrl + `filters/${environment}/${orderBy}/${searchFor}/${field}`, this.defaultRequestOpts);
  }

  public getByField<EventLogModel>(searchFor : string = '', field: string = ''): Observable<EventLogModel> {
    return this._http.get<EventLogModel>(this._serviceUrl + `search/${searchFor}/${field}`, this.defaultRequestOpts);
  }

  public getAll<EventLogModel>(): Observable<EventLogModel> {
    return this._http.get<EventLogModel>(this._serviceUrl, this.defaultRequestOpts);
  }

  public delete<T>(id: number): Observable<EventLogModel> {
    return this._http.delete<EventLogModel>(this._serviceUrl + id, this.defaultRequestOpts);
  }

  public update<T>(id: number): Observable<EventLogModel> {
    return this._http.put<EventLogModel>(this._serviceUrl + id, '', this.defaultRequestOpts);
  }

}
