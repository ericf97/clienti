import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Case } from '../../interfaces/case.interface';
import { CasesService } from '../../services/cases.service';
import { AuthUserPopupComponent } from '../../components/auth-user-popup/auth-user-popup.component';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss'],
})
export class CasesComponent implements OnInit {
  casos: Case[] = [];

  spinner: boolean = true;

  constructor(public casesService: CasesService, private popUp: MatDialog) {}

  ngOnInit(): void {
    if (this.casesService.cases.length) {
      this.spinner = false;
    } else {
      this.casesService.getCases().subscribe({
        next: (resp) => {
          this.spinner = false;
        },
      });
    }
  }

  openDialog( userId: any ) {
    this.popUp.open(AuthUserPopupComponent,{
      minHeight:'30vh',
      minWidth:'40vw',
      data: {
        id: userId
      }
    })
  }
}
