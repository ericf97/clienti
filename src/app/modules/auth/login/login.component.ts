import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUser!: Auth;

  loginForm: FormGroup = new FormGroup(
    {
      nick: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    }
  )

  constructor(private router: Router, private authService: AuthService) {
    if (localStorage.getItem('token')) {
      this.router.navigate(['./home'])
    }
  }

  ngOnInit(): void { }


  login() {
    this.loginUser = {
      nick: this.loginForm.get('nick')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.authService.login(this.loginUser);
  }
}
