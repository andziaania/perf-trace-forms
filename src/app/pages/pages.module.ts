import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UsersComponent } from './users/users.component';
import { PagesComponent } from './pages.component';
import { NbLayoutModule, NbMenuModule, NbSidebarModule, NbSelectModule, NbDatepickerModule, NbButtonModule,
        NbInputModule, NbToggleModule, NbCardModule, NbCheckboxModule } from '@nebular/theme';

import { ChartsModule } from 'ng2-charts';
import { ChartUsersComponent } from './users/chart-users/chart-users.component';
import { OnOffButtonDirective } from './shared/on-off-button.directive';


@NgModule({
  declarations: [UsersComponent, PagesComponent, ChartUsersComponent, OnOffButtonDirective],
  imports: [
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

  ]
})
export class PagesModule { }
