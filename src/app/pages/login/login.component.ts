import { Component, OnInit } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, FloatLabelModule, PasswordModule,DividerModule, ButtonModule, CardModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup = new FormGroup({}) 
  constructor(private authService:AuthService, private formBuilder:FormBuilder) { }

  ngOnInit() { 
    this.initForm();
  }

  login(){
    let formValues = this.loginForm.value
    console.log(formValues)
    let result= this.authService.signIn(formValues.email,formValues.password)
    console.log(result)
   }
   
   initForm(){
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
   
   }
}
