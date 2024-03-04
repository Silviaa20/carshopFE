import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { UtentiService } from '../../../src/service/utenti.service';

export const routes: Routes = [
  {
    path: '',
    title: "Anagrafica",
    loadComponent: () => import('./profilo.component').then((m) => m.ProfiloComponent),
    children: [
      {
        path: '',
        redirectTo: 'profilo',
        pathMatch: 'full'
      },
      {
        path: 'profilo',
        title: 'Profilo utente', 
        loadComponent: () =>
          import('./profilo.component').then((m) => m.ProfiloComponent),
      },
    ],
  },
];