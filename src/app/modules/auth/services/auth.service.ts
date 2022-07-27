import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl: string = environment.apiBase + '/login';

  USER: Auth = {
    nick: 'admin',
    password: 'enzoenzo'
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      // 'Accept': '*/*'  
    }),
  };

  activeUser: Auth | undefined;

  apiUrl = environment.apiBase;

  constructor( private http: HttpClient ) { 
    if (localStorage.getItem('token')) {
      this.activeUser = this.USER;
    }
  }

  login( user: Auth ) {
    console.log(user);
    console.log(this.USER);
    if (user.nick == this.USER.nick && user.password == this.USER.password) {
      this.activeUser = user;
      localStorage.setItem('token', user.nick);
      window.location.reload();
      return true;
    } else {
      return false
    }
  }

  logout() {
    window.location.reload();
    localStorage.removeItem('token');
    this.activeUser = undefined;
  }

  verifyAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    } else {
      this.activeUser = this.USER;
      return of(true);
    }
  }
}

