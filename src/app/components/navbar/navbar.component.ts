import { Component, OnInit } from '@angular/core';
// @Инициализация в компоненте AuthService ; private authService: AuthService
import { AuthService } from "../../services/auth.service";
// @Отсеживание состояния роутера
import { Router, Event, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  userName: string;
  // @Отсеживание состояния роутера
  isPublic: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    //@Инициализация отслеживания Обязательно event: Event
    this.router.events.subscribe( (event: Event)  => {
      if(event instanceof NavigationEnd) {
        this.isPublic = event.url.indexOf('panel') === -1
      }
    });
    // @Check auth state
    this.authService.checkAuth().subscribe(auth => {
      if(auth) {
        this.isLogin = true;
        this.userName = auth.email;
      } else {
        this.userName = '';
        this.isLogin = false;
      }
    });
  }

  logOut() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/login'])
      });
  }
}

