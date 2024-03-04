import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { environment } from "../../src/environment/environment";

/** Service per il modulo degli utenti, conterrà al suo interno tutte le funzionalità collegate agli utenti  */
@Injectable({ providedIn: "root" })
export class UtentiService {
  baseUrl = environment.apiUrl;

  /**
   * Il costruttore della classe
   * @param {HttpClient} http Il metodo HTTP utilizzato per la richiesta (GET, POST, PUT, PATCH, DELETE).
   */
  constructor(private http: HttpClient) {}

  /**
   * Il resolver viene utilizzato per effettuare una chiamata prima dell'inizializzazione del costruttore di una componente
   * Questa chiamata parte quindi al cambio della rotta, mantenendo i dati al suo interno
   * @returns {Observable<any>}
   */
  resolveListaUtenti(): Observable<any> {
    return this.getListaUtenti(25, 0).pipe(
      catchError((error) => {
        return of("No data");
      })
    );
  }

  /**
   * Esegue la get paginata della lista utenti
   * @param {number} pageSize La linghezza della lista che ci verrà tornata
   * @param {number} pageNumber Il numero della pagina che vogliamo visualizzare
   * @param {any} args Un parametro non obbligatorio che ci servirà nel caso in cui dovesse avvenire un filtraggio all'interno della lista
   * @returns {Observable<any>}
   */
  getListaUtenti(
    pageSize: number,
    pageNumber: number,
    ...args: any
  ): Observable<any> {
    let url = `${this.baseUrl}auth/getAllPaginata?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    // Si esegue un forEach degli argomenti ricevuti e ottenendo la chiave valore dell'argomento ricevuto viene inserito all'interno dell'url
    args.forEach((x: any) => {
      if (x) {
        for (const [key, value] of Object.entries(x)) {
          url = url + `&${key}=${value}`;
        }
      }
    });
    return this.http.get<any>(url);
  }

  getAdmin(): Observable<any> {
    let url = `${this.baseUrl}auth/getAllAdmin`;
    return this.http.get<any>(url);
  }

  getUtente(user: any): Observable<any> {
    let url = `${this.baseUrl}auth/read?id=${user}`;
    return this.http.get<any>(url);
  }
  getUtenteByUsername(username: any): Observable<any> {
    let url = `${this.baseUrl}auth/readusername?username=${username}`;
    return this.http.get<any>(url);
  }

  
getTuttiUtenti(): Observable<any>{
  let url = `${this.baseUrl}auth/getAll`;
  return this.http.get<any> (url);
}
  

  delete(id: number):  Observable<any>{
    let url = `${this.baseUrl}auth/delete?id=${id}`;
    return this.http.delete<any>(url);
  }

  modifica(payload: any, id: number): Observable<any> {
    let url = `${this.baseUrl}auth/update?id=${id}`;
    return this.http.put(url, payload);
  }

  insert(body: any): Observable<any> {
    let url = `${this.baseUrl}auth/insert`;
    return this.http.post(url, body);
  }
}
