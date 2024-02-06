import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PoPageLoginModule } from '@po-ui/ng-templates';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SignupComponent } from '../signup/signup.component';
import { AuthService } from 'src/app/auth/auth.service';

@NgModule({
  declarations: [
    // LoginComponent,
    SignupComponent
  ],
  imports: [CommonModule, PoPageLoginModule, LoginRoutingModule],
  providers: [AuthService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginModule {}
