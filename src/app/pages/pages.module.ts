import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UsersComponent } from './users/users.component';
import { PagesComponent } from './pages.component';
import { NbLayoutModule, NbMenuModule, NbSidebarModule } from '@nebular/theme';

import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [UsersComponent, PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    ChartsModule,
  ]
})
export class PagesModule { }
