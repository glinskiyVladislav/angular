import { Component, OnInit } from '@angular/core';
// @Инициализация в компоненте AuthService ; private authService: AuthService
import { AuthService } from "../../services/auth.service";

import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  userName: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // @Check auth state
    this.authService.checkAuth().subscribe(auth => {
      if(auth) {
        this.isLogin = true;
        this.userName = auth.email;
      } else {
        this.userName = '';
        this.isLogin = false;
      }
    })
  }

  logOut() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/login'])
      });
  }
}

// закончил урок 6 часть 2 32 минуты
