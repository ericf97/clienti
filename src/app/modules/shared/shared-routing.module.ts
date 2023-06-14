import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from '../auth/guards/auth.guard';


const routes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: 'home',
          loadChildren: () =>
            import('../moneyback/moneyback.module').then(
              (m) => m.MoneybackModule
            ),
          canLoad: [AuthGuard],
          canActivate: [AuthGuard],
        },
        {
          path: 'login',
          loadChildren: () =>
            import('../auth/auth.module').then((m) => m.AuthModule),
        },
        {
          path: '**',
          redirectTo: 'home',
        },
      ],
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
