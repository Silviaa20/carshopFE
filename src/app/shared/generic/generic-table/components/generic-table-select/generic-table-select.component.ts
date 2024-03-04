import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { AngularMaterialModule } from '../../../../../../../src/app/utils';
import { ReplacePipe } from '../../../../../../../src/app/pipes/replace.pipe';
import { GenericTableService } from '../../../../../../../src/service/generic-table.service';
import { Subscription } from 'rxjs';

/** Componente per la select del filtraggio della tabella */
@Component({
  selector: 'app-generic-table-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    ReplacePipe,
  ],
  templateUrl: './generic-table-select.component.html',
  styleUrls: ['./generic-table-select.component.scss'],
  providers: [ReplacePipe],
})
export class GenericTableSelectComponent {
  /** Output per l'emit del valore selezionato */
  @Output() emitSelectedOption: EventEmitter<string> =
    new EventEmitter<string>();
  /** Le option che vengono visualizzate all'interno della select */
  @Input() selectOptions: string[] = [];
  /** La label che appare nella select */
  @Input() selectLabel: string = '';
  /** Il form control della select */
  selectedOption: FormControl = new FormControl('');
  /** Subscription per l'evento di reset del filtraggio */
  filterSubscription!: Subscription

  /**
   * Il costruttore della classe
   * @param {GenericTableService} genericTableService L'injectable del service GenericTableService
   */
  constructor(private genericTableService: GenericTableService) {}

  /** Effettua la sottoscrizione all'observable restando in ascolto del filtraggio negli altri filtri della tabella */
  ngOnInit() {
    this.filterSubscription = this.genericTableService
      .emitFiterListener()
      .subscribe((res) => {
        if (res !== 'select') this.selectedOption.setValue('');
      });
  }

  /** Effettua l'unsubscribe */
  ngOnDestroy() {
    if (this.filterSubscription) this.filterSubscription.unsubscribe;
  }
  /** Funzione per l'emit del value del formControl */
  selectValue() {
    this.genericTableService.emitFiterEvent('select')
    this.emitSelectedOption.emit(this.selectedOption.value);
  }


}
