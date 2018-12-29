import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  onSubmit() {
    this.authService.register(this.email, this.password)
      .then((auth) => {
        console.log(auth);
        this.router.navigate(['/panel'])
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
