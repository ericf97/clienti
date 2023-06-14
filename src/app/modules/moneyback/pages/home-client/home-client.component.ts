import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CasesService } from '../../services/cases.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { CaseCommentsPopupComponent } from '../../components/case-comments-popup/case-comments-popup.component';
import { Case } from '../../interfaces/case.interface';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeClientComponent implements OnInit {
  spinner: boolean = true;

  user: string = '';

  constructor(
    private router: Router,
    public authService: AuthService,
    public casesService: CasesService,
    private cookieService: CookieService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.authService.decrypt(this.cookieService.get('roleId')) == '1') {
      this.router.navigate(['home']);
    } else {
      this.casesService.getCaseStates().subscribe(() => {
        this.casesService
          .getUserCases(
            this.authService.decrypt(this.cookieService.get('userId'))
          )
          .subscribe((resp) => {
            this.casesService.cases = resp;
            console.log(this.casesService.cases);
            this.user = this.authService.decrypt(
              this.cookieService.get('user')
            );
            this.spinner = false;
          });
      });
    }
  }

  openCommentsDialog(caseId: number) {
    this.dialog.open(CaseCommentsPopupComponent, {
      height: '40vh',
      width: '60vw',
      data: {
        text: this.casesService.cases.find((a) => a.caseId == caseId)
          ?.caseDetails,
        callback: (text: string) => {
          let userCase: Case = {
            ...this.casesService.cases.find((a) => a.caseId == caseId)!,
            caseDetails: text,
          };
          this.casesService.editCase(userCase).subscribe(console.log);
          this.dialog.closeAll();
        },
      },
    });
  }
}
