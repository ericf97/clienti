import { Component, OnInit } from '@angular/core';
import { CasesService } from '../../services/cases.service';
import { Case } from '../../interfaces/case.interface';
import { AuthUserPopupComponent } from '../../components/auth-user-popup/auth-user-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cases: Case[] = [];

  spinner: boolean = true;

  constructor(
    public casesService: CasesService,
    public authService: AuthService,
    private router: Router,
    private popUp: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.authService.activeUser != 'admin') {
      this.router.navigate(['home', localStorage.getItem('user')]);
    }
    if (this.casesService.cases.length) {
      this.spinner = false;
    } else {
      this.casesService.getCases().subscribe({
        next: () => {
          this.spinner = false;
        },
      });
    }
  }

  openDialog(userId: any) {
    this.popUp.open(AuthUserPopupComponent, {
      minHeight: '30vh',
      minWidth: '40vw',
      data: {
        id: userId,
      },
    });
  }
}
