import { Component } from '@angular/core';
import { ProdottoService } from '../../../service/prodotto.service';
import { Prodotto } from '../../../modules/prodotto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prodotto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prodotto.component.html',
  styleUrl: './prodotto.component.scss'
})
export default class ProdottoComponent {

  constructor(private service : ProdottoService){

  }

  ngOnInit(){
    this.getListaProdotti()
  }

  
  //o inizializzi con = oppure ! vicino a lista prodotti e non inizializzi 
  listaProdotti : Prodotto[] = []

  //metodo che sottoscrve l'observable
  getListaProdotti () {
    this.service.getAll().subscribe({
      next : (res) => this.listaProdotti = res,
      error : (e) => console.log(e)
    }) //res ed e sono le risposte della subscribe o ritorna res o e se è un errore 
  } 

}
