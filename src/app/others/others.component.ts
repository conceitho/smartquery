import { Component } from '@angular/core';
import { BasicProtheusServicesService } from 'src/app/components/shared/services/basic-protheus-services/basic-protheus-services.service';

import {
  PoDynamicFormField,
  PoDynamicFormFieldChanged,
  PoDynamicFormValidation,
  PoNotificationService
} from '@po-ui/ng-components';
import { fwFormStructViewFields } from 'src/app/components/shared/interfaces/fwFormStructViewFields';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent {
  isLoading: boolean = false;
  alias: string = '';
  // {
  //   property: 'nana2',
  //   label: 'Nome da pessoa',
  //   required: true,
  //   minLength: 4,
  //   maxLength: 50,
  //   gridColumns: 6,
  //   gridSmColumns: 12,
  //   order: 1,
  //   placeholder: 'Type your name',
  // },
  fields: Array<PoDynamicFormField> = [];

  constructor(private fwFormStructView: BasicProtheusServicesService) {}

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
}
