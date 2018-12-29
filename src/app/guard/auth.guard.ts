// @Защита роута
import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
  ) {}
  canActivate(): Observable<boolean> {
    // метод должен возвращать обсервбл - и только!
    return this.afAuth.authState.pipe(map((auth) => {
      if(!auth) {
        // @Добавление защиты на роуты canActivate:[AuthGuard] - если не залогинен то редирект на логин
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    }))
  }
}
