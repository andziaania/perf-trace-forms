import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { APP_MENU } from './pages-menu';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  menu: NbMenuItem[] = APP_MENU;

  constructor() { }

  ngOnInit() {
  }

}
