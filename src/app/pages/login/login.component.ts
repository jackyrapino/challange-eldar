import { Component, OnInit } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserManagerService } from '../../services/user-manager/user-manager.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    DividerModule,
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  loginForm: FormGroup = new FormGroup({});
  showError: boolean = false;
  isLoading: boolean = false;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userManager: UserManagerService,
    private mesageService: MessageService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  async login() {
    try {
      this.isLoading = true;
      const formValues = this.loginForm.value;
     
      const result = await this.authService.signIn(
        formValues.email,
        formValues.password
      );

      this.userManager.SaveUser(formValues.email);
      this.router.navigate(['/home']);
    } catch (error) {
      this.isLoading = false;
    
      this.showError = true;

      this.mesageService.add({
        severity: 'error',      
        summary: 'Error',
        detail: 'Invalid email or password for login',
      });
    }
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
    });
  }
}
