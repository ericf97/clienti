import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUser!: Auth;

  loginForm: FormGroup = new FormGroup(
    {
      user: new FormControl('', [ Validators.required, Validators.email ]),
      password: new FormControl('',[ Validators.required, Validators.minLength(6) ])
    }
  )

  constructor() { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.loginForm.get('user')?.value);
    console.log(this.loginForm.get('password')?.value);
    this.loginUser = {
      user: this.loginForm.get('user')?.value,
      password: this.loginForm.get('password')?.value
    }
    console.log(this.loginUser);
  }
}
