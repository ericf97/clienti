import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl: string = environment.apiBase + '/login';

  USER: Auth = {
    nick: 'admin',
    password: 'enzoenzo',
  };

  USER_CLIENT: Auth = {
    nick: 'ericfz',
    password: 'adminadmin',
  };

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      // 'Accept': '*/*'
    }),
  };

  activeUser: string | null;

  apiUrl = environment.apiBase;

  constructor(private http: HttpClient, private cookieService: CookieService) {
      this.activeUser = localStorage.getItem('user');
  }

  login(user: Auth) {
    let parsedUser = JSON.stringify(user);

    if (
      parsedUser == JSON.stringify(this.USER) ||
      parsedUser == JSON.stringify(this.USER_CLIENT)
    ) {
      this.activeUser = user.nick;
      localStorage.setItem('user', user.nick);
      window.location.reload();
      return true;
    } else {
      return false;
    }
    // return this.http.post(`${this.apiUrl}/login`, user).subscribe({
    //   next: () => {
    //     this.cookieService.set('user', user.nick, 1, '/');
    //     window.location.reload();
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });
  }

  logout() {
    window.location.reload();
    localStorage.removeItem('user');
    this.activeUser = null;
  }

  createUser(username: string, pass: string, id: number) {
    return this.http.post(`${this.apiUrl}/login/signup`, {
      nick: username,
      pass: pass,
      userId: id,
    });
  }

  verifyAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('user')) {
      return of(false);
    } else {
      this.activeUser = localStorage.getItem('user');
      return of(true);
    }
  }
}
