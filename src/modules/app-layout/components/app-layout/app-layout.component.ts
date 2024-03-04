import { CommonModule, Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';
import { Observable, Subscription, fromEvent } from 'rxjs';

import { LoaderSpinnerService } from '../../../../service/loader-spinner.service';
import { LoginService } from '../../../../service/login.service';
import { AngularMaterialModule } from '../../../../app/utils';
import { SetTextByUrlPipe } from '../../../../app/pipes';
import {
  BUTTON_CONSTANT,
  DASHBOARD_HEADER,
  LABEL_CONSTANT,
  // PERMISSIONS_CONSTANT,
} from '../../../../app/constants';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MatSidenavContent } from '@angular/material/sidenav';
import { CreaUtenteComponent } from '../../../../app/shared/button';
import { GenericButtonComponent } from '../../../../app/shared/button/generic-button/generic-button.component';

/** Una classe per il componete del layout dell'APP dopo essersi loggati */
@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    SetTextByUrlPipe,
    HeaderComponent,
    SidenavComponent,
    SetTextByUrlPipe,
    CreaUtenteComponent,
    GenericButtonComponent,
  ],
})
export default class AppLayoutComponent {
  /** Costante delle label dei button */
  buttonConstant: any = BUTTON_CONSTANT;
  /** Costante delle label della dashboard*/
  dashboardConstant: any = DASHBOARD_HEADER;
  /** Costante delle label generiche */
  labelConstant: any = LABEL_CONSTANT;
  /** Il tema da carica */
  theme: string = '';
  /** Il titolo della pagina*/
  title: string = '';
  /** Observable per la sottoscrizione allo storage per il check dello stato del login */
  sourceStorage!: Observable<Event>;

  /** La sezione in cui si si trova */
  section!: '' | 'utenti' | 'anagrafica' | 'profilo';

  /** Subscription all'observable degli eventi del router */
  routingSubscriptionNavigationEnd!: Subscription;
  /** Eventuale classe da aggiungere*/
  classToAdd: string = '';
  /** Subscription all'observable degli evento di navigazione consentita */
  navigationAllowedListener!: Subscription;
  /** Indica se si ha il permesso di vedere un determinato button */
  hasPermission: boolean = false;
  /** Booleana per la scomparsa del bottone di inizioComunicazione */
  showButton: boolean = true;
  /** variabile per gestire il subscribe allo Storage */
  subscription = fromEvent<StorageEvent>(window, 'storage').subscribe(() => {});
  /** Decoratore ViewChild per la gestione dello scroll */
  @ViewChild(MatSidenavContent, { read: MatSidenavContent })
  sidenavContentScrollable?: MatSidenavContent;
  /** variabile per gestire l'esportazione dei professionisti */
  showEsportaProfessionisti: boolean = false;
  /** variabile per gestire il ruolo */
  role: any;

  /**
   * Il costruttore della classe.
   * @param {CanDeactivateGuardService} canDeactivateService L'injectable del service CanDeactivateGuard
   * @param {LoaderSpinnerService} loaderSpinnerService L'injectable del service LoaderSpinner
   * @param {LoginService} loginService L'injectable del service Login
   * @param {Router} router L'injectable del service router per la navigazione tra viste e url
   * @param {Location} location L'injectable del service Location
   */
  constructor(
    // private canDeactivateService: CanDeactivateGuardService,
    private loaderSpinnerService: LoaderSpinnerService,
    public loginService: LoginService,
    private router: Router,
    private location: Location
  ) {}

  /**
   * Lifecycle Hook dell'OnInit.
   * Si chiama il metodo per impostare la sezione e si effettua il controllo sullo storage
   */
  ngOnInit(): void {
    this.setSection();
    this.checkStorage();
    this.routingSubscriptionNavigationEnd = this.router.events.subscribe(
      (e: any) => {
        if (e instanceof NavigationStart) {
          this.loaderSpinnerService.show();
        } else if (
          e instanceof NavigationCancel ||
          e instanceof NavigationError
        ) {
          this.loaderSpinnerService.hide();
        } else if (e instanceof NavigationEnd) {
          this.loaderSpinnerService.hide();
        }
      }
    );
  }

  /**
   * Lifecycle hook per l'onDestroy
   * Si annullano le iscrizione effettuate agli observable.
   * Si Effettua l'hide del loaderSpinner
   */
  ngOnDestroy(): void {
    if (this.routingSubscriptionNavigationEnd) {
      this.routingSubscriptionNavigationEnd.unsubscribe();
    }
    this.loaderSpinnerService.hide();
    this.subscription.unsubscribe();
    
  }

  

  /** Effettua il back della navigazione */
  goBack(): void {
    this.location?.back();
  }

  /** Imposta la sezione e i permessi a seconda dell'url */
  setSection() {
    if (this.router.url.includes('gestionale/utenti/lista')) {
      this.section = 'utenti';
      console.log(this.section);
    } else if(this.router.url.includes('gestionale/anagrafica/getall')) {
      this.section = 'anagrafica';
      console.log(this.section);
    } else if(this.router.url.includes('gestionale/profilo')) {
      this.section = 'anagrafica';
      console.log(this.section);
    }
    else this.section = '';
    console.log(this.section);
  }

  checkStorage() {
    this.sourceStorage = fromEvent(window, 'storage');
    this.subscription = this.sourceStorage.pipe().subscribe(() => {
      let dataStorage = localStorage.getItem('loggato');
      if (!dataStorage) {
        this.loginService.logout();
      }
    });
  }

  onButtonClicks(): void {
    console.log('Button Clicked!');
    // Puoi eseguire altre azioni quando il bottone viene cliccato
  }
}
