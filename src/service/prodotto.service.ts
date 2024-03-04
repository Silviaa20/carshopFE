import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prodotto } from '../modules/prodotto';

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {
        //nelle tonde ciò che iniettiamo da altre classi, nelle graffe ciò che ci serve al caricamento dela pagina, come l'on init dei component
  constructor(private http : HttpClient) {}
baseUrl = environment.apiUrl
//qui le variabili devono essere assegnate tipo baseUrl, nel costruttore invece le dichiari tipo http

//le chiamate ritornano un obs che deve poi essere sottoscritto
//parentesi quadre per la lista, funziona anche con any ma così è piu pulito e preciso
getAll () : Observable <Prodotto[]>{
  //quando dichiariuna variabile dentro un metodo devi usare per forza o let o const 
  //apici storti
  let url = `${this.baseUrl}prodotto/getAll`
  return this.http.get<Prodotto[]>(url) //url senza this. perchè è nello stesso metodo dichoarata, http no invece 

}

}
