import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';


export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'home', component:HomeComponent, canActivate: [authGuard]},
    {path: 'new-post', component:NewPostComponent, canActivate: [authGuard,roleGuard]},
    {path:'edit-post/:id', component:NewPostComponent, canActivate: [authGuard, roleGuard]},
    {path:'', redirectTo:'home', pathMatch:'full'},

];
