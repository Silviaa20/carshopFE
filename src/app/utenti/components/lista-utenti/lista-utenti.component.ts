import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  ICON_CONSTANT,
  INPUT_CONSTANT,
  LABEL_CONSTANT,
  RESULT_CONSTANT,
  TABLE_COLUMNS,
} from "src/app/constants";
import { AngularMaterialModule } from "src/app/utils";
import { GenericTableComponent } from "src/app/shared/generic";
import { ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { WorkInProgressComponent } from "src/app/shared";
import { GenericTableService, LoaderSpinnerService, LoginService } from "src/app/services";
import { UtentiService } from "src/app/services/utenti.service";
import { InserisciUtenteComponent } from "../inserisci-utente/inserisci-utente.component";

@Component({
  selector: "app-lista-utenti",
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, GenericTableComponent],
  templateUrl: "./lista-utenti.component.html",
  styleUrls: ["./lista-utenti.component.scss"],
})
export default class ListaUtentiComponent {
  /** Costante per la label di risultato vuoto della tabella */
  resultConstant = RESULT_CONSTANT;//
  /** La grandezza della pagina */
  size = INPUT_CONSTANT.pageSize;//
  /** L'indice della pagina attuale della Tabella */
  pageIndex = INPUT_CONSTANT.pageNumber;//
  /** Il totale di elementi della tabella */
  totalElements!: number;//
  /** Il dataSource della tabella */
  dataSource!: any;//
  /** La lista delle colonne da visualizzare */
  displayedColumns = TABLE_COLUMNS.utenti;//
  /** I tipi di celle dell'header */
  cellHeadTypes = { 
    //select: "checkbox",
    username: "sort",
    usertype: "sort",
  };
  /** Il valore del sort sulle colonne */
  sortedItems = {
    username: false,
    usertype: false,
  };
  /** La lista degli utenti */
  listaUtenti: any[] = [];//

  /**
   * Il costruttore della classe
   * @param { ActivatedRoute } activatedRoute Fornisce accesso alle informazioni sulla rotta associata a questa componente
   */
  constructor(
    private genericTableService: GenericTableService,
    private loaderSpinnerService: LoaderSpinnerService,
    private utentiService: UtentiService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private loginService: LoginService
  ) {}

  /**
   * Lifecycle hook dell'o<nInit
   * Si popola il data source
   * */
  ngOnInit() {
    this.getDataFromResolver();
  }

  /** Recupera i dati dal resolver */
  getDataFromResolver() {
    this.totalElements =
      this.activatedRoute.snapshot.data["listaUtenti"].totalElements;
    this.pageIndex = this.activatedRoute.snapshot.data["listaUtenti"].pageIndex;
    this.listaUtenti = this.activatedRoute.snapshot.data["listaUtenti"].content;
    if (this.listaUtenti) {
      this.dataSource = new MatTableDataSource<any>(
        this.getMappedDataSource(this.listaUtenti)
      );
    }
  }

  changePage(event: any) {
    // Quando facciamo partire una qualsiasi chiamata facciamo apparire il loaderSpinner per dare un feedback visivo all'utente
    this.loaderSpinnerService.show();
    this.utentiService
      .getListaUtenti(INPUT_CONSTANT.pageSize, event.number)
      .subscribe({
        // Quando ci sottoscriviamo ad una qualsiasi chiamata, bisogna utilizzare le casistiche next ed error per gestire correttamente le funzionalità
        next: (res) => {
          this.totalElements = res.totalElements;
          this.pageIndex = event.number;
          if (res.content) {
            this.listaUtenti = res.content;
            this.dataSource = new MatTableDataSource<any>(
              this.getMappedDataSource(this.listaUtenti)
            );
          }
          // Ricordarsi di aggiungere questa riga di codice ogni volta che si crea una funzione di cambio pagina della tabella, altrimenti si spacca
          this.genericTableService.emitFilteringStatus(false);
          // Nascondere il loader spinner dopo aver effettuato le nostre logiche
          this.loaderSpinnerService.hide();
        },
        // Nascondere sempre il loader spinner nella casistica di errore della chiamata
        error: () => this.loaderSpinnerService.hide(),
      });
  }

  /** Funzione per mappare i singoli elementi della response */
  getMappedDataSource(toMap: any[]) {
    let user = this.loginService.getUtenteSessione();
    toMap = toMap.filter(r => user.username !== r.username);
    // Mappiamo il nostro array di oggetti ricevuto dal backend
    return toMap.map((r) => {
      // Creiamo un'array di azioni che l'utente puo effettuare sulla tabella
      const action = [
        {
          // Ogni azione ha bisogno di un titolo
          title: LABEL_CONSTANT.modifica,
          // Icona
          icon: ICON_CONSTANT.edit,
          // Il tipo di bottone, se 'icon' oppure 'button'
          type: "icon",
          // Una callback, sarà la funzione che partirà sul click dell'azione
          callback: () => this.modificaUtente(r.id),
        },
        {
          title: LABEL_CONSTANT.elimina,
          icon: ICON_CONSTANT.delete,
          type: "icon",
          callback: () => this.eliminaUtente(r.id),
        },
      ];
      // Ritorniamo quindi per ogni elemento all'interno dell'array un nuovo oggetto che avrà come nomi delle variabili i nomi delle colonne
      return {
        id: r.id,
        select: false,
        username: r.username,
        usertype: r.usertype,
        // dataCreazione: this.datePipe.trasform(r.dataCreazione, 'dd/MM/yyyy'),
        action: action,
      };
    });
  }

  /**
   * Funzione per la modifica dell'utente, apre la modale di modifica utente
   * @param {number} id L'id dell'utente da modificare
   */
  modificaUtente(id: number) {
    this.dialog.open(InserisciUtenteComponent,{
      width: '660px',
      height: '400px',
      disableClose: true,
    }).componentInstance.setModifica(id);
  }

  /**
   * Funzione per l'eliminazione dell'utente, apre la modale di conferma eliminazione
   * @param {number} id L'id dell'utente da eliminare
   */
  eliminaUtente(id: number) {
    this.utentiService.delete(id).subscribe({
      next: () => {
          //this.router.navigate(['gestionale/anagrafica/getall']);
          this.listaUtenti = this.listaUtenti.filter(utenti => utenti.id !== id);
          window.location.reload();
      },
      error: (error: any) =>{
        console.log("errore durante l'eliminazione dell'utente", error);
      }
    })
  }
}
