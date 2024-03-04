import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';


import { GenericTableService } from '../../../../../../../src/service/generic-table.service';
import { AngularMaterialModule } from '../../../../../../../src/app/utils';
import { ACCESSIBILITY_CONSTANT, BUTTON_CONSTANT } from '../../../../../../../src/app/constants';

/** Componente per la singola cella del body della tabella */
@Component({
  selector: 'app-generic-body-cell',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './generic-body-cell.component.html',
  styleUrls: ['./generic-body-cell.component.scss'],
})
export class GenericBodyCellComponent {
  /** Decorator Viewchild dell'elemento della lista delle chip */
  @ViewChild('chipsContainer') chipsContainer!: ElementRef;
  /** La colonna del head */
  @Input() col!: string;
  /** L'elemento della riga */
  @Input() element: any;
  /** Il tipo di cella del body */
  @Input() bodyType!: any;
  /** Numero tabella */
  @Input() numeroTabella!: number;
  /** Aria Label per la chip list */
  @Input() chipListAriaLabel: string =
    ACCESSIBILITY_CONSTANT.chip_list_aria_label;
  /** Emitter dell'evento di check/uncheck della checkbox */
  @Output() emitCheckElement: EventEmitter<any> = new EventEmitter<any>();
  /** Subscription all'observable dell'evento di check/uncheck dell'check della cella del head */
  checkAllSubscription!: Subscription;
  /** Costante per la label del button */
  buttonConstant: any = BUTTON_CONSTANT;
  /** Costante delle label dell'accessibilità*/
  accessibilityConstant = ACCESSIBILITY_CONSTANT;
  /** Indica il numero nascosto di elementi della chiplist */
  chipListHiddenNumber: number = 0;
  /** Lista dei primi tre element della chiplist */
  chipListWithOnlyFirstThreeElement: any[] = [];
  /** La classe da assegna alla chip */
  chipClass: string = '';

  constructor(private genericTableService: GenericTableService) {}

  /**
   * Lifecycle Hook dell'OnInit.
   * Se la colonna è uguale a 'select' si effettua la sottoscrizione all'observable dell'evento di checkAll
   */
  ngOnInit() {
    if (this.col === 'select') {
      this.checkAllSubscription = this.genericTableService
        .checkAllListener()
        .subscribe({
          next: (value: any) => {
            if (value.numeroTabella == this.numeroTabella) {
              this.element[this.col] = value.isAllSelected;
            }
          },
        });
    }
  }

  /** Lifecycle Hook dell'AfterViewInit per impostare quante chip mostrare per intero */
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.element[this.col] == true) {
        this.selected(this.element);
      }
      if (this.bodyType?.type === 'chip') {
        this.setChipListElements();
      }
    }, 100);
  }

  /**
   * Lifecycle hook dell'OnDestroy.
   * Si annullano le iscrizione effettuate agli observable.
   * Si effettua il complete del Subject ngUnsubscribe in modo che le chiamate alle API ancora in corso vengono cancellate per via del takeUntil con questo subject.
   */
  ngOnDestroy(): void {
    if (this.checkAllSubscription) {
      this.checkAllSubscription.unsubscribe();
    }
  }

  /**
   * Listener dell'evento di resize della finestra in cui si reimposta la lista dei chip
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.bodyType?.type === 'chip') {
      this.setChipListElements();
    }
  }

  /**
   * Check/unCheck dell'elemento
   * @param {any} element L'elemento selezionato
   */
  selected(element: any) {
    //this.element[this.col] = !this.element[this.col];
    if (!this.element.selected && this.element.inputTextValue) {
      this.element.inputTextValue = null;
    }
    this.emitCheckElement.emit(element);
  }

  /**
   * Imposta la lista di chip visibiile
   */
  private setChipListElements() {
    const qSelector: any = document.querySelectorAll('th.tag');
    const width = qSelector?.length ? qSelector[0].offsetWidth : 0;
    let elementToShow = 1;
    let totalLength = 0;
    if (this.element[this.col]?.length) {
      this.element[this.col].map((el: any, index: number) => {
        totalLength += 8 * el.length + 24;
        if (index > 0 && totalLength < width - 50) {
          elementToShow++;
        }
        this.chipClass = this.setChipClass(el);
      });
      this.chipListWithOnlyFirstThreeElement = this.element[this.col].slice(
        0,
        ++elementToShow
      );
      this.chipListHiddenNumber =
        this.element[this.col]?.length - elementToShow;
    }
  }

  /**
   * Imposta la classe da assegnare alla chip
   * @param {string} val Il tipo di classe da assegnare
   * @returns {string} La classe da assegnare
   */
  private setChipClass(val: string): string {
    switch (val) {
      case 'NUOVO':
        return 'chip-nuovo';
      case 'DANNEGGIATO':
        return 'chip-danneggiato';
      case 'BUONE CONDIZIONI':
        return 'chip-buono';
      default:
        return 'chip-disabled';
    }
  }
}
