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
import { ProgressStatusComponent } from './components/progress-status/progress-status.component';
import { SharedRoutingModule } from './shared-routing.module';



@NgModule({
  declarations: [
    LayoutComponent,
    SidenavComponent,
    MobileSidenavComponent,
    NavigationItemsComponent,
    HeaderComponent,
    ProgressStatusComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedRoutingModule
  ],
  exports: [
    ProgressStatusComponent
  ],
})
export class SharedModule {}
