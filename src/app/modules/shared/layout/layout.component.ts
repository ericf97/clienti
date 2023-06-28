import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  show: any;

  constructor(public auth: AuthService, private cookieService: CookieService) {}

  ngOnInit(): void {
    if (this.cookieService.check('userId')) {
      this.auth.getUserInfo();
    }
    this.show = this.auth.activeUser;
  }
}
