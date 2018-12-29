// @Auth service
import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  login(email: string, password: string) {
    return new Promise( (resolve, reject) => {
        this.afAuth.auth.signInWithEmailAndPassword(email, password)
          .then(user => resolve(user))
          .catch(err => reject(err))
    });
  }
  // @Check auth state  Нужно в ng on init прописать при логине
  checkAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}
