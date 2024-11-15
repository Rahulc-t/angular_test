import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AddUserComponent } from './components/adduser/adduser.component';
import { EditUserComponent} from './components/edituser/edituser.component';

export const routes: Routes = [
    {path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
    path: 'login',
    component: LoginComponent
},
{
    path: 'signup',
    component: SignupComponent
},
{
    path: 'home',
    component:HomeComponent
},
{
    path: 'add-user',
    component:AddUserComponent
},
{
    path: 'edit-user/:id',
    component:EditUserComponent
}
];
