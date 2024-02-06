import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { PoStorageService } from '@po-ui/ng-storage';
import { PoPageLogin, PoPageLoginLiterals } from '@po-ui/ng-templates';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hideRememberUser: boolean = true;
  showMenuEmmiter = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: PoStorageService,
    private poNotification: PoNotificationService
    // private localForage: LocalForage
  ) {}
  signinSubmit(formData: PoPageLogin) {
    // const localForage = require('localforage');

    const userform = Object.assign({
      email: formData.login,
      password: formData.password,
      data: {
        name: String,
        token: String
      }
      // password: md5.appendStr(formData.password).end(),
      // in_role: 1, in_ctx: 1
    });
    localStorage.getItem('access_token')
      ? this.router.navigate(['/profile'])
      : this.authService.post(userform).subscribe(
          res => {
            this.storage.set('isLoggedIn', 'true').then(() => {
              // localStorage.setItem('access_token', res.data.token)
              this.authService.SetToken(res.token);
              this.router.navigate(['/home']);
            });
          },
          res => {
            if (!res.hasOwnProperty('token')) {
              this.poNotification.error('Usuário ou senha invalidos ! Tente novamente.');
            }
          }
        );
  }
}
