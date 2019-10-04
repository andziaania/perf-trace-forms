import { UrlsComponent } from './urls/urls.component';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AboutComponent } from './about/about.component';
import { PerformanceComponent } from './performance/performance.component';



const routes: Routes = [
  {
    path: '',
    component: PagesComponent,  // This component has router-outlet for its children
    children: [
      { path: 'about', component: AboutComponent },
      { path: 'users', component: UsersComponent },
      { path: 'performance', component: PerformanceComponent },
      { path: 'urls', component: UrlsComponent },

      { path: '', redirectTo: 'about', pathMatch: 'full'},
      { path: 'perf-trace', redirectTo: 'users', pathMatch: 'full' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
