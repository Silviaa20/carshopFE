import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../../../../../src/app/utils';
import { BUTTON_CONSTANT } from '../../../../../src/app/constants';

@Component({
  selector: 'app-generic-button',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './generic-button.component.html',
  styleUrls: ['./generic-button.component.scss']
})
export class GenericButtonComponent {
  @Input() valore: string = 'Button Label';
  @Input() disabled: boolean = false;
  @Output() click: EventEmitter<void> = new EventEmitter<void>();
  buttonConstant = BUTTON_CONSTANT;

  onButtonClick(): void {
    this.click.emit();
  }
}

