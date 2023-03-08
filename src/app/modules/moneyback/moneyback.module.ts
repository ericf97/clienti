import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path:':id',
        component: HomeClientComponent
      },
      // {
      //   path: 'calendar',
      //   component: CalendarComponent,
      // },
      // {
      //   path: 'cases',
      //   component: CasesComponent,
      // },
      {
        path: 'case/:id',
        component: CaseComponent,
      },
      // {
      //   path: 'client/:id',
      //   component: ClientComponent,
      // },
      // {
      //   path: 'clients',
      //   component: ClientsComponent,
      // },
    ],
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

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
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  providers:[DatePipe]
})
export class MoneybackModule {}
