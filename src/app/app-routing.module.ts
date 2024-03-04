import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', //nell'url
        title: "Home prodotto",
        loadComponent: () =>import('./prodotto/prodotto/prodotto.component'),
      },










];
