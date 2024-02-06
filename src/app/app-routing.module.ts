import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/signin/login.component';
import { HomeComponent } from './home/home.component';
import { CustomQueryComponent } from './custom-query/custom-query.component';
import { OthersComponent } from './others/others.component';
import { AuthGuard } from './auth/auth.guard';
import { SignupComponent } from './login/signup/signup.component';
import { CreateUserComponent } from './custom-query/createUser/createUser.component';
import { EditUserComponent } from './custom-query/editUser/editUser.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
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
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
