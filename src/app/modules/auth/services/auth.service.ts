import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth, UserInfo } from '../interfaces/auth.interface';
import { CookieService } from 'ngx-cookie-service';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl: string = environment.apiBase + '/login';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      // 'Accept': '*/*'
    }),
  };

  activeUser!: UserInfo | null;

  apiUrl = environment.apiBase;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(user: Auth) {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  logout() {
    this.cookieService.delete('user', '/');
    this.cookieService.delete('userId', '/');
    this.cookieService.delete('roleId', '/');
    this.activeUser = null;
    window.location.reload();
  }

  createUser(username: string, pass: string, id: number) {
    return this.http.post(`${this.apiUrl}/login/signup`, {
      nick: username,
      pass: pass,
      userId: id,
    });
  }

  verifyAuthentication(): Observable<boolean> {
    if (!this.cookieService.get('user')) {
      return of(false);
    } else {
      this.cookieService.get('user');
      return of(true);
    }
  }

  getUserInfo() {
    return this.http
      .get<UserInfo>(
        `${this.apiUrl}/user/${this.decrypt(this.cookieService.get('userId'))}`
      )
      .subscribe((resp) => {
        this.activeUser = resp;
      });
  }

  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, 'm0n3yb4ck$!').toString();
  }

  decrypt(value: string): string {
    return CryptoJS.AES.decrypt(value, 'm0n3yb4ck$!').toString(
      CryptoJS.enc.Utf8
    );
  }
}
