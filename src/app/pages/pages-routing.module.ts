import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AboutComponent } from './about/about.component';



const routes: Routes = [
  {
    path: '',
    component: PagesComponent,  // This component has router-outlet for its children
    children: [
      { path: 'about', component: AboutComponent },
      { path: 'users', component: UsersComponent },
      { path: '', redirectTo: 'about', pathMatch: 'full'},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
