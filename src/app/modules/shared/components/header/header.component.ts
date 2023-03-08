import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();

  user: string | null = this.authService.activeUser;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.activeUser;
  }

  logout() {
    this.authService.logout();
  }
  toggleHandler() {
    this.toggleSidenav.emit();
  }
}
