import { Component, OnInit } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserManagerService } from '../../services/user-manager/user-manager.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, FloatLabelModule, PasswordModule,DividerModule, ButtonModule, CardModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  loginForm:FormGroup = new FormGroup({}) 
  constructor(private authService:AuthService, private formBuilder:FormBuilder, private router:Router, private userManager: UserManagerService) { }

  ngOnInit() { 
    this.initForm();
  }

  async login() {
    try {
      const formValues = this.loginForm.value;
      console.log('Form Values:', formValues);
      const result = await this.authService.signIn(formValues.email, formValues.password);
      console.log('Login Result:', result);
      this.userManager.SaveUser(formValues.email);
      this.router.navigate(['/home']);

      
    } catch (error) {
      console.error('Error during login:', error);
  

    }
  }
   
   initForm(){
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
   
   }
}
