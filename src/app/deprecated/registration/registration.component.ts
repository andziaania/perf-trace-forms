import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pt-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  login: string;
  password: string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

  }

}
