import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sample-po-avatar-business-card',
  templateUrl: './profile.component.html',
  styles: [
    `
      .sample-center-image {
        display: block;
        margin: 0 auto;
      }
    `
  ]
})
export class ProfileComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  avatar = 'https://avatars.githubusercontent.com/u/56516071?v=4';

  contact = {
    name: 'Murilo Carvalho',
    email: 'mcarvalhos@conceitho.com',
    phone: '47912012015'
  };

  auth = {
    logoff: 'Sair'
  };

  callContact(phone: string) {
    window.open(`tel:${phone}`, '_self');
  }
  Logoff(logoff: string) {
    this.authService.removeToken();
    // localStorage.removeItem('access_token')
    this.router.navigate(['/login']);
  }
  sendContact(email: string) {
    window.open(`mailto:${email}`, '_self');
  }

  formatPhoneNumber(phone: string) {
    return `(${phone.substring(0, 2)}) ${phone.substring(2, 7)}-${phone.substring(7)}`;
  }
}
