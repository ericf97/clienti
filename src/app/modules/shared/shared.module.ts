import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout/layout.component';

import { MaterialModule } from '../material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MobileSidenavComponent } from './components/mobile-sidenav/mobile-sidenav.component';
import { NavigationItemsComponent } from './components/navigation-items/navigation-items.component';
import { HeaderComponent } from './components/header/header.component';

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
  declarations: [
    LayoutComponent,
    SidenavComponent,
    MobileSidenavComponent,
    NavigationItemsComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
})
export class SharedModule {}
