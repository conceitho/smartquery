import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PoDynamicFormComponent,
  PoDynamicFormField,
  PoDynamicFormFieldChanged,
  PoDynamicFormValidation,
  PoNotificationService,
  PoPageEditLiterals
} from '@po-ui/ng-components';
import { Router } from '@angular/router';

import { CreateUserService } from './createUser.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-new',
  templateUrl: './createUser.component.html',
  styleUrls: ['./createUser.component.css'],
  providers: [CreateUserService]
})
export class CreateUserComponent implements OnInit {
  apiUrl = 'https://po-sample-api.fly.dev/v1/people';

  @ViewChild('dynamicForm', { static: true }) dynamicForm!: PoDynamicFormComponent;
  person = {};
  validateFields: Array<string> = ['state'];

  literals: PoPageEditLiterals = { 'cancel': 'Voltar', 'save': 'Confirmar', 'saveNew': 'Confirmar e criar um novo' };

  fields: Array<PoDynamicFormField> = [
    {
      property: 'name',
      label: 'Nome completo',
      divider: 'PERSONAL DATA',
      required: true,
      minLength: 4,
      maxLength: 50,
      gridColumns: 6,
      gridSmColumns: 12,
      order: 1,
      placeholder: 'Digite seu nome (obrigatório)'
    },
    {
      property: 'birthday',
      label: 'Data de nascimento',
      type: 'date',
      format: 'mm/dd/yyyy',
      gridColumns: 6,
      gridSmColumns: 12,
      maxValue: '2010-01-01',
      errorMessage: 'A data deve ser antes de 2010.',
      order: -1,
      required: true
    },
    {
      property: 'cpf',
      label: 'CPF',
      mask: '999.999.999-99',
      gridColumns: 6,
      gridSmColumns: 12,
      visible: true,
      required: true,
      minLength: 12,
      placeholder: 'Digite seu cpf (obrigatório)'
    },
    {
      property: 'cnpj',
      label: 'CNPJ',
      mask: '99.999.999/9999-99',
      gridColumns: 6,
      gridSmColumns: 12,
      visible: false,
      placeholder: 'Digite seu cnpj (opcional)'
    },
    {
      property: 'genre',
      label: 'Gênero',
      gridColumns: 6,
      gridSmColumns: 12,
      options: ['Masculino', 'Femenino', 'Outro'],
      order: 2,
      required: true
    },

    {
      property: 'status',
      label: 'Disponibilidade',
      gridColumns: 3,
      type: 'boolean',
      booleanTrue: 'Sim',
      booleanFalse: 'Não',
      formatModel: true,
      required: true
    },
    {
      property: 'email',
      label: 'E-mail',
      divider: 'CONTACTS',
      gridColumns: 6,
      icon: 'po-icon-mail',
      required: true,
      placeholder: 'Digite seu e-mail (obrigatório)'
    },
    {
      property: 'phone',
      label: 'Telefone',
      mask: '(99) 99999-9999',
      gridColumns: 6,
      required: true,
      placeholder: 'Digite seu telefone (obrigatório)'
    },
    {
      property: 'address',
      label: 'Endereço',
      gridColumns: 6,
      required: true,
      placeholder: 'Digite seu endereço (obrigatório)'
    },
    {
      property: 'addressNumber',
      label: 'Número',
      type: 'number',
      gridColumns: 6,
      maxValue: 10000,
      errorMessage: 'Endereço inválido',
      placeholder: 'Número (obrigatório)'
    },
    {
      property: 'state',
      label: 'Estado',
      gridColumns: 6,
      options: [
        { state: 'Santa Catarina', code: 1 },
        { state: 'São Paulo', code: 2 },
        { state: 'Rio de Janeiro', code: 3 },
        { state: 'Minas Gerais', code: 4 }
      ],
      fieldLabel: 'state',
      fieldValue: 'code',
      required: true
    },
    {
      property: 'city',
      label: 'cidade',
      disabled: true,
      gridColumns: 6,
      fieldValue: 'code',
      fieldLabel: 'city',
      required: true
    },

    {
      property: 'wage',
      label: 'Remuneração',
      type: 'currency',
      gridColumns: 3,
      gridSmColumns: 12,
      decimalsLength: 2,
      thousandMaxlength: 7,
      icon: 'po-icon-finance'
    },
    {
      property: 'hobbies',
      label: 'Hobbies',
      divider: 'INFORMAÇÕES ADCIONAIS',
      gridColumns: 6,
      gridSmColumns: 12,
      optional: true,
      options: ['Futebol', 'Basquete', 'Ciclismo', 'Yoga', 'Viajar', 'Correr', 'Luta'],
      optionsMulti: true
    },
    {
      property: 'partner',
      label: 'Parceiro',
      gridColumns: 6,
      gridSmColumns: 12,
      optionsService: 'http://localhost:3000/people/2',
      fieldLabel: 'name',
      fieldValue: 'id',
      optional: true
    },
    {
      property: 'image',
      type: 'upload',
      gridColumns: 12,
      gridSmColumns: 12,
      label: 'Adcionar foto de perfil',
      optional: true,
      url: 'https://po-sample-api.onrender.com/v1/uploads/addFile'
    }
  ];

  constructor(
    public poNotification: PoNotificationService,
    private registerService: CreateUserService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.person = {
      name: 'Tony Stark',
      birthday: '1970-05-29',
      isJuridicPerson: false,
      videogame: ['PS4', 'NSW', 'XSSX'],
      rememberSecretKey: 'no',
      status: 'active'
    };
  }

  onChangeFields(changedValue: PoDynamicFormFieldChanged): PoDynamicFormValidation {
    return {
      value: { city: undefined },
      fields: [
        {
          property: 'city',
          gridColumns: 6,
          options: this.registerService.getCity(changedValue.value.state),
          disabled: false
        }
      ]
    };
  }

  onLoadFields(value: any) {
    return this.registerService.getUserDocument(value);
    this.onCreateUser;
  }

  onCreateUser() {
    const newPerson = this.dynamicForm.form.value;
    console.log(newPerson);
    console.log(newPerson.cpf);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post(this.apiUrl, newPerson, httpOptions).subscribe(
      (response: any) => {
        console.log('Sucesso:', response);
      },
      (error: any) => {
        console.error('Erro:', error);
      }
    );
  }

  cancel() {
    this.router.navigate(['/custom-query'])
  }
}
