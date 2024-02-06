import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PoStorageService } from '@po-ui/ng-storage';
import { GenericService } from '../generic/service/generic.service';
import { tokenModel } from '../model/tokenModel';
import * as fs from 'fs';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
@Injectable({
  providedIn: 'root'
})
export class AuthService extends GenericService<tokenModel> {
  private tokenExpirationTime: number = 3 * 55 * 60 * 1000; // quase 3 hroas

  constructor(
    http: HttpClient,
    public poNotification: PoNotificationService,
    private router: Router,
    private storage: PoStorageService
  ) {
    super(http);
    this.path = 'usuario/login';
  }
  private navigateToLogin() {
    this.router.navigate(['/login']);
  }
  SetToken(ResToken: string) {
    const expirationTime = Date.now() + this.tokenExpirationTime;
    localStorage.setItem('access_token', ResToken);
    localStorage.setItem('token_expiration', expirationTime.toString());
    return localStorage.setItem('access_token', ResToken);
  }
  isTokenExpired(): boolean {
    const expirationTime = localStorage.getItem('token_expiration');
    if (!expirationTime) {
      // Se não houver data de expiração, considera-se que o token está expirado.
      return true;
    }
    const currentTime = Date.now();
    return currentTime > parseInt(expirationTime, 10);
  }

  getToken(): string | null {
    const expirationTime = localStorage.getItem('token_expiration');
    if (!expirationTime) {
      // Se não houver data de expiração, retorna null, indicando que o token não está definido ou expirou.
      return null;
    }

    const currentTime = Date.now();
    if (currentTime > parseInt(expirationTime, 10)) {
      // Se o token estiver expirado, remova-o e retorne null.
      this.removeToken();
      this.navigateToLogin();

      this.poNotification.success('Sessão expirada, faça login novamente.');
      return null;
    }

    // Se o token estiver válido, retorne o token.
    return localStorage.getItem('access_token');
  }

  isLoged() {
    return localStorage.getItem('access_token') ? true : false;
  }

  isLoggedIn(): Promise<any> {
    return this.storage.get('isLoggedIn');
  }
  removeToken() {
    return localStorage.removeItem('access_token');
  }
}
