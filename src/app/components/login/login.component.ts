import { Component, OnInit } from '@angular/core';
// @Инициализация в компоненте AuthService ; private authService: AuthService
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    // @Check auth state
    this.authService.checkAuth().subscribe(auth => {
      if(auth) {
        this.router.navigate(['/panel']);
      }
    });
  }

  // @login
  onSubmit() {
    this.authService.login(this.email, this.password)
      .then(user => {
       this.router.navigate(['/panel']);
       // show message
      })
      .catch(err => {
        // Обработать ошибку
        console.log(err)
      });
  }

}
