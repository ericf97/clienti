import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUser!: Auth;

  spinner: boolean = false;

  loginForm: FormGroup = new FormGroup({
    nick: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    if (this.cookieService.get('user')) {
      this.router.navigate(['./home']);
    }
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      this.spinner = true;
      this.loginUser = {
        nick: this.loginForm.get('nick')?.value,
        pass: this.loginForm.get('password')?.value,
      };
      this.authService.login(this.loginUser).subscribe({
        next: (resp: any) => {
          this.cookieService.set('user', this.authService.encrypt(this.loginUser.nick), 1, '/');
          this.cookieService.set('userId', this.authService.encrypt(resp.user.userId), 1, '/');
          this.cookieService.set('roleId', this.authService.encrypt(resp.user.roleId), 1, '/');
          this.spinner = false
          window.location.reload();
        },
        error: (error) => {
          this.spinner = false
          console.log(error);
        },
      });
    }
  }
}
