import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { Location } from '@angular/common';
import { UserManagerService } from '../../services/user-manager/user-manager.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MenubarModule,ButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
showButtonHome: boolean = false;
constructor(
  private authService: AuthService,
  private router: Router,
  private location: Location,
  private userManager: UserManagerService
) {}

ngOnInit() {  
  this.showButtonHome = this.location.path() != '/home';
}

  logout() {
    this.authService.signOut().then(() => {
      this.userManager.removeUser();
      this.router.navigate(['/login']);
    });
  }

  gotoHome() {
    this.router.navigate(['/home']);
  }
}
