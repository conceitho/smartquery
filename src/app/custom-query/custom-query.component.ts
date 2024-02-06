import { HomeComponent } from './../home/home.component';
import { fwFormStructViewFields } from '../components/shared/interfaces/fwFormStructViewFields';
import { PoButtonGroupItem, PoButtonGroupModule } from '@po-ui/ng-components';
import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {
  PoPageDynamicEditField,
  PoPageDynamicSearchLiterals,
  PoPageDynamicTableActions,
  PoPageDynamicTableCustomAction
} from '@po-ui/ng-templates';
import { BasicProtheusServicesService } from 'src/app/components/shared/services/basic-protheus-services/basic-protheus-services.service';

@Component({
  selector: 'app-custom-query',
  templateUrl: './custom-query.component.html',
  styleUrls: ['./custom-query.component.scss']
})
export class CustomQueryComponent {
  actions: PoPageDynamicTableActions = {
    edit: 'edit/:id',
    new: 'create',
    remove: true
  };

  pageActions: Array<PoPageDynamicTableCustomAction> = [
    {
      label: 'Visualizar',
      url: '/others',
      icon: 'po-icon-more'
    }
  ];

  isLoading: boolean = false;
  alias: string = '';
  buttons: Array<PoButtonGroupItem> = [];
  toolsLink: any;
  link: string = '';


  readonly fields: Array<PoPageDynamicEditField> = [
    { property: 'id', key: true },
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
  constructor(private fwFormStructView: BasicProtheusServicesService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getButtonData()

    this.http.get<any>('http://localhost:3000/tools').subscribe(data => {

    });
  }


  public handleFormStructView() {
    this.isLoading = true;
    this.fwFormStructView.getFormStructView(this.alias).subscribe(
      data => {
        const fieldsResponse: fwFormStructViewFields[] = data[this.alias].fields;

        fieldsResponse.forEach((item: fwFormStructViewFields) => {
          console.log(item);
          const optionsItems: any[] = [];

          if (item.combobox.length > 0) {
            const combobox = item.combobox.filter(element => element.trim() !== '');

            combobox.forEach(item => {
              let option = item.split('=');

              if (combobox.length > 3) {
                optionsItems.push({
                  state: option[1],
                  code: option[0]
                });
              } else {
                optionsItems.push(option[1]);
              }
            });
          }

          let formItem: any = {
            property: item.field,
            label: item.description,
            required: item.required ? item.required : false
          };

          if (optionsItems.length > 0) {
            formItem = {
              ...formItem,
              options: optionsItems,
              fieldLabel: 'state',
              fieldValue: 'code'
            };
          }

          this.fields.push(formItem);
        });

        this.isLoading = false;
      },
      error => (this.isLoading = false)
    );
  }
  edit() { }
  getButtonData() {
    this.http.get('http://localhost:3000/tools').subscribe(
      (data: any) => {
        data.items.forEach((item: any) => {
          this.link = item.link;
          this.buttons.push({
            label: item.label,
            action: () => this.router.navigate([item.link]),
          })
        })
      },
      (error) => {
        console.error('Erro ao buscar dados dos butões:', error);
      }

    );
  }

}
