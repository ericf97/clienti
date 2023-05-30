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
      this.loginUser = {
        nick: this.loginForm.get('nick')?.value,
        pass: this.loginForm.get('password')?.value,
      };
      this.authService.login(this.loginUser);
    }
  }
}
