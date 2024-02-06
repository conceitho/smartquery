import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomQueryComponent } from './custom-query.component';
import { CreateUserComponent } from './createUser/createUser.component';

const routes: Routes = [
  { path: '', component: CustomQueryComponent },
  { path: 'create', component: CreateUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomQueryRoutingModule {}
