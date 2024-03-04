import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ICON_CONSTANT, INPUT_CONSTANT, LABEL_CONSTANT, RESULT_CONSTANT, TABLE_COLUMNS, } from 'src/app/constants';
import { AngularMaterialModule } from 'src/app/utils';
import { GenericTableComponent } from 'src/app/shared/generic';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { WorkInProgressComponent } from 'src/app/shared';
import { GenericTableService, LoaderSpinnerService, LoginService } from 'src/app/services';
import { AnagraficaService } from 'src/app/services/anagrafica.service';
import { ModificaAnagraficaComponent } from '../modifica-anagrafica/modifica-anagrafica.component';


@Component({
  selector: 'app-anagrafica-getall',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, GenericTableComponent],
  templateUrl: './lista-anagrafica.component.html',
  styleUrls: ['./lista-anagrafica.component.scss']
})
export class ListaAnagraficaComponent {
  resultConstant = RESULT_CONSTANT;
  size = INPUT_CONSTANT.pageSize;
  pageIndex = INPUT_CONSTANT.pageNumber;
  totalElements!: number;
  dataSource!: any;
  displayedColumns = TABLE_COLUMNS.anagrafica;

  cellHeadTypes = {
    select: "checkout",
    nome: "sort",
    cognome: "sort",
    indirizzo: "sort",
    luogoNascita: "sort",
    dataNascita:"sort",
    user: "sort"
  };

  sortedItems = {
    nome: false,
    cognome: false,
    indirizzo: false,
    luogoNascita: false,
    dataNascita: false,
    user: false
  };

  listaAnagrafica:any[] = [];

  constructor(
    private genericTableService: GenericTableService,
    private loaderSpinnerService: LoaderSpinnerService,
    private anagraficaService: AnagraficaService,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.getDataFromResolver();
  }

  getDataFromResolver() {
    this.totalElements =
      this.activatedRoute.snapshot.data['listaAnagrafica'].totalElements;
    this.pageIndex = this.activatedRoute.snapshot.data['listaAnagrafica'].pageIndex;
    this.listaAnagrafica = this.activatedRoute.snapshot.data['listaAnagrafica'].content;
    if (this.listaAnagrafica) {
      this.dataSource = new MatTableDataSource<any>(
        this.getMappedDataSource(this.listaAnagrafica)
      );
    }
  }

  changePage(event: any) {
    this.loaderSpinnerService.show();
    this.anagraficaService
      .getListaAnagrafica(INPUT_CONSTANT.pageSize, event.number)
      .subscribe({
        next: (res) => {
          this.totalElements = res.totalElements;
          this.pageIndex = event.number;
          if (res.content) {
            this.listaAnagrafica = res.content;
            this.dataSource = new MatTableDataSource<any>(
              this.getMappedDataSource(this.listaAnagrafica)
            );
          }
          this.genericTableService.emitFilteringStatus(false);
          this.loaderSpinnerService.hide();
        },
        error: () => this.loaderSpinnerService.hide(),
      });
  }

  getMappedDataSource(toMap: any[]) {
    let user = this.loginService.getUtenteSessione();
    toMap = toMap.filter(r => {
      if (!user || !r.user) {
          return true;
      }
      return user.username !== r.user.username;
  });  
    return toMap.map((r) => {
      const action = [
        {
          title: LABEL_CONSTANT.modifica,
          icon: ICON_CONSTANT.edit,
          type: 'icon',
          callback: () => this.modificaAnagrafica(r.id),
        },
        {
          title: LABEL_CONSTANT.elimina,
          icon: ICON_CONSTANT.delete,
          type: 'icon',
          callback: () => this.eliminaAnagrafica(r.id),
        },
      ];
      return {
        //id: r.id,
        select: false,
        nome: r.nome,
        cognome: r.cognome,
        indirizzo: r.indirizzo,
        dataNascita: r.dataNascita,
        luogoNascita: r.luogoNascita,
        user: r.user ? r.user.username : '-',
        action: action,
      };
    });
  }

  modificaAnagrafica(id: number) {
    this.dialog.open(ModificaAnagraficaComponent, {
      width: '660px',
      height: '400px',
      disableClose: true,
    }).componentInstance.setModificaAnagrafica(id);
  }

  
  eliminaAnagrafica(id: number) {
    this.anagraficaService.deleteAnagrafica(id).subscribe({
      next: () => {
          this.listaAnagrafica = this.listaAnagrafica.filter(anagrafica => anagrafica.id !== id);
          window.location.reload();
          
      },
      error: (error: any) =>{
        console.log("errore durante l'eliminazione dell'anagrafica", error);
      },
    });
  }
}
