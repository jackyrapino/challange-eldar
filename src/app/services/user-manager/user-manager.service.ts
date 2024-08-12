import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserManagerService {
  constructor() {}

  SaveUser(email: string) {
    let user = { email, role: this.setRole(email) };
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') as string);
  }

  setRole(email: string) {
    if (email === 'admin@admin.com') {
      return 'admin';
    } else {
      return 'user';
    }
  }

  removeUser() {
    localStorage.removeItem('user');
  }
}
