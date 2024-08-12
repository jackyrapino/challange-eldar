import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NewPostComponent } from './pages/new-post/new-post.component';


export const routes: Routes = [
    {path:' ', redirectTo:'login'},
    {path:'login', component:LoginComponent},
    {path:'home', component:HomeComponent},
    {path: 'new-post', component:NewPostComponent},
    {path:'edit-post/:id', component:NewPostComponent},

];
