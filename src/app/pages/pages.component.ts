import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { APP_MENU } from './pages-menu';

@Component({
  selector: 'pt-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  menu: NbMenuItem[] = APP_MENU;

  constructor(private sidebarService: NbSidebarService) { }

  ngOnInit() {
  }


  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }
}
