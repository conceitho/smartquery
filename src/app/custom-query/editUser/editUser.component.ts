import { Component, OnInit } from '@angular/core';
import { PoPageDynamicEditField } from '@po-ui/ng-templates';
import { PoPageDynamicEditActions } from '@po-ui/ng-templates';
@Component({
  selector: 'app-editUser',
  templateUrl: './editUser.component.html',
  styleUrls: ['./editUser.component.css']
})
export class EditUserComponent implements OnInit {
  public readonly ApiService = 'http://localhost:3000/people_single';

  public readonly actions: PoPageDynamicEditActions = {
    save: '/custom-query'
  };

  readonly fields: Array<PoPageDynamicEditField> = [
    { property: 'id', key: true },
    {
      property: 'name',
      label: 'Nome completo'
    },
    {
      property: 'birthday',
      label: 'Data de nascimento'
    },
    { property: 'cpf', label: 'CPF' },
    { property: 'cnpj', label: 'CNPJ' },
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

  ngOnInit(): void {}
}
