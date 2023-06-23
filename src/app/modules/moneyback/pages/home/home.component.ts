import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CasesService } from '../../services/cases.service';
import { Case } from '../../interfaces/case.interface';
import { AuthUserPopupComponent } from '../../components/auth-user-popup/auth-user-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  cases: Case[] = [];

  spinner: boolean = true;

  progressColors = [
    { class: 'orange', limit: 35 },
    { class: 'yellow', limit: 75 },
    { class: 'green', limit: 99 },
    { class: 'success', limit: 100 },
  ];

  constructor(
    public casesService: CasesService,
    public authService: AuthService,
    private router: Router,
    private popUp: MatDialog,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    console.log('dasdsada');
    
    if (this.authService.decrypt(this.cookieService.get('roleId')) != '1') {
      this.router.navigate(['home', this.cookieService.get('user')]);
    } else {
      this.casesService.getCaseStates().subscribe(() => {
        if (this.casesService.cases.length) {
          this.spinner = false;
        } else {
          this.casesService.getCases().subscribe({
            next: () => {
              this.spinner = false;
            },
          });
        }
      });
    }
  }

  setProgress(stateId: number) {
    let progress = this.casesService.caseStates.find(
      (a: any) => a.stateId == stateId
    ).percentage;
    let colors = this.progressColors.find((a) => a.limit >= progress);
    return {
      progress: progress,
      ...colors,
    };
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
