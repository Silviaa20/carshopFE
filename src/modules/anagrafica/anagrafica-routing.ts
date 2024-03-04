import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AnagraficaService } from 'src/app/services/anagrafica.service';

export const routes: Routes = [
  {
    path: '',
    title: "Anagrafica",
    loadComponent: () => import('./components/anagrafica/anagrafica.component').then((m) => m.AnagraficaComponent),
    children: [
      {
        path: '',
        redirectTo: 'getall',
        pathMatch: 'full'
      },
      {
        path: 'getall',
        title: 'Tutte le anagrafiche', 
        loadComponent: () =>
          import('./components/lista-anagrafica/lista-anagrafica.component').then((m) => m.ListaAnagraficaComponent),
          resolve:{
            listaAnagrafica: () => inject(AnagraficaService).resolveListaAnagrafica(),
          },
      },
    ],
  },
];