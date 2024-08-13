import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth) { }


  async signIn(email:string,password:string){
    return await signInWithEmailAndPassword(this.auth,email.toLowerCase(),password);
  }

  async signOut(){
   return await this.auth.signOut();
  }
}
