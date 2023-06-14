import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { HomeComponent } from './pages/home/home.component';
import { ClientComponent } from './pages/client/client.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CasesComponent } from './pages/cases/cases.component';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './pages/clients/clients.component';
import { CaseComponent } from './pages/case/case.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { AuthUserPopupComponent } from './components/auth-user-popup/auth-user-popup.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { HomeClientComponent } from './pages/home-client/home-client.component';
import { SharedModule } from '../shared/shared.module';
import { MoneybackRoutingModule } from './moneyback-routing.module';
import { CaseCommentsPopupComponent } from './components/case-comments-popup/case-comments-popup.component';



@NgModule({
  declarations: [
    HomeComponent,
    ClientComponent,
    CalendarComponent,
    CasesComponent,
    ClientsComponent,
    CaseComponent,
    PopUpComponent,
    AuthUserPopupComponent,
    HomeClientComponent,
    CaseCommentsPopupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MoneybackRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  providers:[DatePipe]
})
export class MoneybackModule {}
