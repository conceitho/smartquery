import { Component } from '@angular/core';

@Component({
  selector: 'sample-po-combo-basic',
  templateUrl: './sample-po-combo-basic.component.html'
})
export class SamplePoComboBasicComponent {
  constructor() {}

  ngOnInit() {
    // // Adiciona um evento de clique nas opções do combo
    // this.combo.onOptionSelect((event) => {
    //   console.log(event.value); // Imprime o valor da opção selecionada
    // });
  }
}
