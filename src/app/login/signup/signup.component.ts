import { environment } from 'src/environments/environment';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { AuthService } from '../../auth/auth.service';

const actionInsert = 'insert';
const actionUpdate = 'update';

@Component({
  selector: 'app-register',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnDestroy, OnInit {
  private readonly url: string = environment.api + '/usuario';

  private action: string = actionInsert;
  private receberSub: Subscription = new Subscription();
  private paramsSub: Subscription = new Subscription();
  private headers: HttpHeaders = new HttpHeaders();
  public helpPassword: string = 'Dica: Digite uma senha forte';

  public record: any = {};

  constructor(
    private poNotification: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private auth: AuthService
  ) {}

  ngOnDestroy() {
    this.paramsSub.unsubscribe();

    if (this.receberSub) {
      this.receberSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.getToken());
    this.paramsSub = this.route.params.subscribe(params => {
      if (params['user']) {
        this.loadData(params['user']);
        this.record = { ...params };
        this.action = actionUpdate;
      }
    });
  }

  cancel() {
    this.router.navigateByUrl('/login');
  }

  save() {
    const record = { ...this.record };
    this.httpClient.post(this.url, record, { headers: this.headers }).subscribe(
      (response: any) => {
        console.log(response);
        response._messages[0].code === '200'
          ? this.navigateToLogin('Registro cadastrado com sucesso')
          : this.handleErroLogin(
              'Não foi possivel criar usuario, verifique o ' + response._messages[0].detailedMessage
            );
      },
      (err: any) => {
        console.log(err);
        if (err.status > 300) {
          this.handleErroLogin('Erro de autenticação - Você precisa fazer estar logago para fazer o registro.');
          // this.handleErroLogin('Erro de autenticação - Você precisa fazer o login novamente.')
        } else {
          // Tratar outros tipos de erros
        }
      }
    );
  }

  get isUpdateOperation() {
    return this.action === actionUpdate;
  }

  get title() {
    return this.isUpdateOperation ? 'Atualizando Titulo Receber' : 'Novo Usuario a Cadastrar';
  }

  private loadData(id: string) {
    let params: any = {
      select: 'an_codtit, an_parce, a1_codcli'
    };

    this.receberSub = this.httpClient
      .get(`${this.url}/${id}`, { headers: this.headers, params: params })
      .pipe(
        map((receber: any) => {
          return receber[0];
        })
      )
      .subscribe(response => (this.record = response));
  }

  private navigateToLogin(msg: string) {
    this.poNotification.success(msg);
    this.router.navigateByUrl('/login');
  }

  private handleErroLogin(msg: string) {
    this.poNotification.error(msg);
    this.helpPassword = `Por favor, escolha uma senha que atenda aos seguintes critérios para garantir a segurança de sua conta:
    Deve conter pelo menos 8 caracteres,combinação de letras maiúsculas e minúsculas, números (0-9), caractere especial, como !, @, #, $, etc.

    `;
  }
}
