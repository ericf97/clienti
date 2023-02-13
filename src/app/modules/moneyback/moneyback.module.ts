import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      // {
      //   path: 'calendar',
      //   component: CalendarComponent,
      // },
      {
        path: 'cases',
        component: CasesComponent,
      },
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
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
})
export class MoneybackModule {}
