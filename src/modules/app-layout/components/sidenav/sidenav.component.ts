import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { LoginService } from '../../../../service/login.service';
import { AngularMaterialModule } from '../../../../app/utils';
import {
  INPUT_CONSTANT,
  LABEL_CONSTANT,
  SIDENAV_MENU_CONSTANT,
  // SIDENAV_MENU_CONSTANT,
} from '../../../../app/constants';
import { Nodes } from '../../../../app/models';
import { WorkInProgressComponent } from '../../../../app/shared';
import { MatDialog } from '@angular/material/dialog';

/** Una classe per il componente della sidenav */
@Component({
  standalone: true,
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  imports: [CommonModule, AngularMaterialModule, RouterModule],
})
export class SidenavComponent {
  /** NestedTreeControl della sidenav */
  treeControl = new NestedTreeControl<Nodes>((node) => node.children);
  /** Sorgente dei dati per il mat-tree della sidenav */
  dataSource = new MatTreeNestedDataSource<Nodes>();
  /** Il nodo attivo */
  activeNode!: any;

  /** Costante delle label generiche */
  labelConstant = LABEL_CONSTANT;
  /**
   * Il costruttore della classe.
   * Chiama il metodo per impostare la sorgente dei dati.
   * @param {LoginService} loginService L'injectable del service Login
   * @param {ActivatedRoute} activatedRoute Fornisce accesso alle informazioni sulla rotta associata a questa componente
   * @param {Router} router L'injectable del service router per la navigazione tra viste e url
   */
  constructor(
    public loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {}

  /**
   * Lifecycle Hook dell'OnInit.
   * Si settano le opzioni visualizabili all'interno della sidenav con la costante precedentemente creata
   */
  ngOnInit(): void {
    this.dataSource.data = SIDENAV_MENU_CONSTANT
    this.checkActiveNode()
  }

  /**
   * Controlla se un nodo ha un nodo figlio
   * @param {number}_ Parametro da non considerare
   * @param {Nodes} node Il nodo da controllare
   * @returns {boolean} Se il nodo ha figli
   */
  hasChild = (_: number, node: Nodes) =>
    !!node.children && node.children.length > 0;

  /**
   * Effettua la navigazione al path associato al nodo e imposta il nodo come attivo.
   * @param {any} node Il nodo su cui fare la navigazione
   */
  gotoPage(node: any) {
    if (!node.wip) {
      this.activeNode = node;
      this.router.navigateByUrl(node.path);
    } else {
      this.dialog.open(WorkInProgressComponent, {
        width: '660px',
        height: '300px',
        disableClose: true,
      });
    }
  }

  /** Controlla quale è il nodo attivo. */
  checkActiveNode() {
    const url = this.router.url;
    this.dataSource.data.some((d) => {
      if (d.path === url) {
        this.activeNode = d;
        this.treeControl.collapseAll();
        return true;
      } else if (d.children?.length) {
        d.children?.forEach((c: any) => {
          if (c.path === url) {
            this.activeNode = c;
            return true;
          }
          return false;
        });
      }
      return false;
    });
  }
}
