import { User } from './../models/user-model';
import { LoginModel } from '../models/login-model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  protected _serviceUrl: string = null;
  protected readonly _http: HttpClient;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(http: HttpClient) {
    this._http = http;
    this._serviceUrl = `${environment.Api.url}/api`;
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(user) {
    return this._http.post(`${this._serviceUrl}/user`, user, {responseType: 'text'}  );
  }

  login(loginInfo: LoginModel) {
    return this._http.post<LoginModel>(`${this._serviceUrl}/login`, loginInfo, httpOptions)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
