import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserManagerService } from '../services/user-manager/user-manager.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const userManagerService = inject(UserManagerService);
  const user = userManagerService.getUser();
  const router = inject(Router); 
  if (user.role === 'admin') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
