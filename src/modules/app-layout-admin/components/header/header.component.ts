import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Subscription } from "rxjs";

import { MatDialog } from "@angular/material/dialog";

import { LoginService } from "../../../../../src/service/login.service";
import { LABEL_CONSTANT } from "../../../../../src/app/constants";
import { AngularMaterialModule } from "../../../../../src/app/utils";
import { SessioneUtenteModel } from "../../../../../src/app/models";
import { WorkInProgressComponent } from "../../../../../src/app/shared";
import { SetTextByUrlPipe } from "../../../../../src/app/pipes";

/** Una classe per il componente dell'header */
@Component({
  standalone: true,
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    SetTextByUrlPipe,
  ],
})
export class HeaderComponent {
  /** Costante delle label generiche */
  labelConstant: any = LABEL_CONSTANT;
  /** Subscription all'observable degli eventi di aggiornamento nominativo utente */
  nominativoUtenteListener!: Subscription;
  /** Il nominativo dell'utente */
  sessioneUtente!: SessioneUtenteModel;
  /** Indica se l'utente è admin */
  isAdmin!: boolean;

  /**
   * Il costruttore della classe.
   * @param {LoginService} loginService L'injectable del service Login
   * @param {ActivatedRoute} activatedRoute Fornisce accesso alle informazioni sulla rotta associata a questa componente
   * @param {Router} router L'injectable del service router per la navigazione tra viste e url
   * @param {MatDialog} matDialog L'injectable del service per aprire la modale
   */
  constructor(
    public loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  /**
   * Lifecycle Hook dell'OnInit.
   * Si imposta il nominativo dell'utente prendendolo dal LocalStorage
   * Si effettua la sottoscrizione all'observable dell'evento di aggiornamento nominativo dell'utente
   */
  ngOnInit(): void {
    this.isAdmin = this.loginService.isAdmin();
    this.sessioneUtente = this.loginService.getUtenteSessione();
    this.nominativoUtenteListener = this.loginService
      .updateNominativoUtenteListener()
      .subscribe((res: SessioneUtenteModel) => {
        console.log("utente:" + res.username);
        this.sessioneUtente = res;
      });
  }

  /**
   * Lifecycle hook per l'onDestroy
   * Si annullano le iscrizione effettuate agli observable.
   */
  ngOnDestroy(): void {
    if (this.nominativoUtenteListener) {
      this.nominativoUtenteListener.unsubscribe();
    }
  }

  /**
   * Mostra la modale di conferma logout.
   * Alla chiusura della modale se si è confermato il logout, viene effettuato.
   */
  logout(): void {
    this.loginService.logout();
  }
}
