import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UsersComponent } from './users/users.component';
import { PagesComponent } from './pages.component';
import { NbLayoutModule, NbMenuModule, NbSidebarModule, NbSelectModule, NbDatepickerModule, NbButtonModule,
        NbInputModule, NbToggleModule, NbCardModule, NbCheckboxModule, NbIconModule } from '@nebular/theme';

import { ChartsModule } from 'ng2-charts';
import { ChartUsersComponent } from './users/chart-users/chart-users.component';
import { UsersTotalComponent } from './users/users-total-card/users-total-card.component';
import { UsersNewVsReturningCardComponent } from './users/users-new-vs-returning-card/users-new-vs-returning-card.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    UsersComponent,
    PagesComponent,
    ChartUsersComponent,
    UsersTotalComponent,
    UsersNewVsReturningCardComponent,
    AboutComponent,
  ], imports: [
    CommonModule,
    PagesRoutingModule,
    ChartsModule,

    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbSelectModule,
    NbDatepickerModule,
    NbButtonModule,
    NbInputModule,
    NbToggleModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
  ]
})
export class PagesModule { }
