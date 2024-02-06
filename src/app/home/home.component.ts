import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  logo: string = '../assets/images/logo-transparent.png';
  menuData: any;
  menus: Array<PoMenuItem> = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getMenuData()
  }

  getMenuData() {
    this.http.get('http://localhost:3000/menu').subscribe(
      (data: any) => {
        this.menus = data.items;
        console.log('Menu Data:', this.menus);
      },
      (error) => {
        console.error('Erro ao buscar dados do menu:', error);
      }
    );
  }

  private onClick() {
    alert('Clicked in menu item');
  }

  private closeApp() {
    alert('Saindo da aplicação');
  }
}
