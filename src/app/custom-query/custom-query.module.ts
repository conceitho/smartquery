import { CustomQueryRoutingModule } from './custom-query-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { CreateUserComponent } from './createUser/createUser.component';
@NgModule({
  declarations: [],
  imports: [CustomQueryRoutingModule, CommonModule, PoModule, HttpClientModule, PoPageDynamicSearchModule]
})
export class CustomQueryModule {}
