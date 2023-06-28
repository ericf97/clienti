import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HomeClientComponent } from './pages/home-client/home-client.component';
import { CaseComponent } from './pages/case/case.component';
import { AuthGuard } from '../auth/guards/auth.guard';


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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoneybackRoutingModule { }
