import { HttpClientModule } from '@angular/common/http';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { PoContainerModule, PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { CustomQueryComponent } from './custom-query/custom-query.component';
import { SamplePoComboBasicComponent } from './components/sample-po-combo-basic/sample-po-combo-basic.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { GenericService } from './generic/service/generic.service';
import { LoginComponent } from './login/signin/login.component';
import { ProfileComponent } from './profile/profile.component';
import { OthersComponent } from './others/others.component';
import { SignupComponent } from './login/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { PoStorageModule } from '@po-ui/ng-storage';
import { CreateUserComponent } from './custom-query/createUser/createUser.component';
import { EditUserComponent } from './custom-query/editUser/editUser.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
@NgModule({
  declarations: [
    AppComponent,
    CustomQueryComponent,
    SamplePoComboBasicComponent,
    AuthComponent,
    LoginComponent,
    ProfileComponent,
    OthersComponent,
    SignupComponent,
    HomeComponent,
    EditUserComponent,
    CreateUserComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    RouterModule,
    PoTemplatesModule,
    SharedModule,
    FormsModule,
    PoStorageModule.forRoot()
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
