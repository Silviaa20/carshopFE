import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { UtentiService } from 'src/app/services/utenti.service';

export const routes: Routes = [
  {
    path: '',
    title: 'Utenti',
    loadComponent: () => import('./components/utenti/utenti.component').then((m) => m.UtentiComponent), // Viene caricata inizialmente una componente contenente soltanto il router outlet,
                                                              // Che farà da recipiente a tutte le altre componenti che verrano caricate tramite rotta
    children: [
      {
        path: '',
        redirectTo: 'lista',
        pathMatch: 'full',
      }, 
      {
        path: 'lista',
        title: 'Tutti gli utenti',
        loadComponent: () => import('./components/lista-utenti/lista-utenti.component'),
        resolve: {                                                        // Il resolve è un oggetto la quale all'interno ha una variabile custom ( Scegliamo noi come nominarla )
          listaUtenti: () => inject(UtentiService).resolveListaUtenti(), // La nostra variabile non sarà nient'altro che una callback ( Notiamo l'arrow function ),                                                          //  quest'ultima inetterà al suo interno il service dove abbiamo creato la nostra funzione resolver
        },
      },
    ],
  },
];
