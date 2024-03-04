import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../../../../src/app/utils';
import { LABEL_CONSTANT } from '../../../../src/app/constants';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * Questa è un dialog d'esempio
 */
@Component({
  selector: 'app-work-in-progress',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './work-in-progress.component.html',
  styleUrls: ['./work-in-progress.component.scss'],
})
export class WorkInProgressComponent {
  /** Costante per le label generiche */
  labelConstant = LABEL_CONSTANT;

  /**
   * Il costruttore della clasee
   * @param {MatDialogRef<WorkInProgressComponent>} dialog il riferimento alla modale
   */
  constructor(private dialog: MatDialogRef<WorkInProgressComponent>) {}

  /** Chiude la modale senza azione */
  closeDialog() {
    this.dialog.close(false);
  }
}
