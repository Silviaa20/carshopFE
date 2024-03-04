import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';


import { LoaderSpinnerService } from '../../../service/loader-spinner.service';
import { AngularMaterialModule } from '../../../../src/app/utils';

/** Una classe per il componente di un Loader Spinner */
@Component({
  selector: 'app-loader-spinner',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.scss'],
})
export class LoaderSpinnerComponent {
  /** Indica se deve essere mostrato */
  show: boolean = false;
  /** Subscription all'observable dell'evento di mostra/nascondi Loader Spinner */
  showSpinnerEventListenerSubject!: Subscription;
  /**
   * Il costruttore della classe
   * @param {LoaderSpinnerService} loaderSpinnerService L'injectable del service LoaderSpinner
   */
  constructor(private loaderSpinnerService: LoaderSpinnerService) {}
  /**
   * Lifecycle Hook dell'OnInit.
   * Si effettua la sottoscrizione all'observable dell'evento di mostra/nascondi Loader Spinner
   */
  ngOnInit(): void {
    this.showSpinnerEventListenerSubject = this.loaderSpinnerService
      .showSpinnerEventListener()
      .subscribe((show: boolean) => {
        this.show = show;
      });
  }

  /**
   * Lifecycle hook per l'OnDestroy
   * Si annullano le iscrizione effettuate agli observable
   */
  ngOnDestroy(): void {
    if (this.showSpinnerEventListenerSubject) {
      this.showSpinnerEventListenerSubject.unsubscribe();
    }
  }
}
