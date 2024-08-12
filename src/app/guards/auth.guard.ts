import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const afAuth = inject(AngularFireAuth); 
  const router = inject(Router); 

  return afAuth.authState.pipe(
    map(user => {
      if (user) {
        return true; 
      } else {
        router.navigate(['/login']); 
        return false; 
      }
    })
  );

};


