import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoaderSpinnerService, NotificationService } from '../services';
import { ERRORS_CONSTANT } from '../constants';

/** Una classe per intercettare le chiamate Http e gestirne gli errori */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * Il costruttore della classe
   * @param {LoaderSpinnerService} loaderSpinnerService L'injectable del service LoaderSpinner
   * @param {NotificationService} notificationService L'injectable del service Notification
   */
  constructor(
    private loaderSpinnerService: LoaderSpinnerService,
    private notificationService: NotificationService
  ) {}

  /**
   * Intercetta la richiesta Http e ne gestisce l'eventuale errore.
   * Se lo status code dell'errore è >= 300 viene mostrato un messaggio di errore in una snackbar aperta per 2500 ms
   * @param {HttpRequest} request La richiesta Http
   * @param {HttpHandler} next Handler della richiesta Http che la trasforma in un flusso di HttpEvent
   * @returns {Observable<any>}
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (
          err.status >= 300 &&
          !request.url.includes('immagine-profilo') &&
          err.error.message !== 'Utente già abilitato' &&
          err.error.message !== 'Il link utilizzato non è valido'
        ) {
          this.notificationService.show(
            err.error.message || ERRORS_CONSTANT.erroreGenerico,
            2500,
            'error'
          );
          this.loaderSpinnerService.hide();
        }
        return request.url.includes('immagine-profilo')
          ? EMPTY
          : throwError(err);
      })
    );
  }
}
