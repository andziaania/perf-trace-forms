import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  readonly LOGIN_MIN_LENGTH = 4;
  readonly PASSWORD_MIN_LENGTH = 6;

  loginForm: FormGroup = this.fb.group({
    login: ['', Validators.compose([Validators.required,
                    Validators.minLength(this.LOGIN_MIN_LENGTH)])],
    password: ['', Validators.compose([Validators.required,
                    Validators.minLength(this.PASSWORD_MIN_LENGTH)])],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {

  }

  get passwordField() {
    return this.loginForm.controls.password;
  }

  get loginField() {
    return this.loginForm.controls.login;
  }


}
