import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProfileComponent } from '../profile/profile.component';
import { CustomQueryComponent } from '../custom-query/custom-query.component';
import { OthersComponent } from '../others/others.component';
import { CreateUserComponent } from '../custom-query/createUser/createUser.component';
import { EditUserComponent } from '../custom-query/editUser/editUser.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'custom-query',
        component: CustomQueryComponent
      },
      {
        path: 'others',
        component: OthersComponent
      },
      {
        path: 'create',
        component: CreateUserComponent
      },

      {
        path: 'edit/:id',
        component: EditUserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
