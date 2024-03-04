import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Puoi eseguire operazioni prima che la richiesta raggiunga il server
    console.log('Intercepted request:', request);

    // Modifica della richiesta aggiungendo un'intestazione
    const modifiedRequest = request.clone({
      setHeaders: { 'Authorization': localStorage.getItem("jwt")??'' },
    });

    // Passa la richiesta modificata al gestore successivo
    return next.handle(modifiedRequest);
  }
}
