import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private auth: AuthService) {
    // firebase.
  }

  login() {
    this.auth.login();
  }

}
