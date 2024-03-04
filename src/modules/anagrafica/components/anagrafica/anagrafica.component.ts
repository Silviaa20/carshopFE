import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../../../../../src/app/utils';
import {DASHBOARD_HEADER} from '../../../../../src/app/constants';
import { SetTextByUrlPipe } from '../../../../../src/app/pipes';
import { GenericButtonComponent } from '../../../../../src/app/shared/button/generic-button/generic-button.component';
import { MatDialog } from '@angular/material/dialog';
import { InserisciAnagraficaComponent } from '../inserisci-anagrafica/inserisci-anagrafica.component';

@Component({
  selector: 'app-anagrafica',
  standalone: true,
  imports: [CommonModule,
     RouterModule,
     SetTextByUrlPipe,
     GenericButtonComponent,
     AngularMaterialModule,],
  templateUrl: './anagrafica.component.html',
  styleUrls: ['./anagrafica.component.scss']
})
export class AnagraficaComponent {
  isModifica: boolean = false;
  title: string = '';
  dashboardConstant: any = DASHBOARD_HEADER;
  constructor(private dialog: MatDialog) {}

  onButtonClicks(){
    this.dialog.open(InserisciAnagraficaComponent, {
      width: '660px',
      height: '400px',
      disableClose: true,
    });
  }
}
