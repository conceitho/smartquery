import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Se o usuário estiver sem sessão,
    // o enviamos para a tela de login
    return this.authService.isLoged() ? true : this.router.navigate(['/login']);
  }
}
