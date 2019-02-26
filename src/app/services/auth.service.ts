import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  login(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  checkAuth() {
    return this.angularFireAuth.authState.map(auth => auth);
  }

  logout() {
    return this.angularFireAuth.auth.signOut();
  }

  createUser(email: string, password:string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }
}
