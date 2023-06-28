import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();

  user: string = '';

  constructor(
    public authService: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.decrypt(this.cookieService.get('user'));
  }

  logout() {
    this.authService.logout();
  }
  toggleHandler() {
    this.toggleSidenav.emit();
  }
}
