import { Routes } from "@angular/router";
import AppLayoutComponent from "./components/app-layout/app-layout.component";

export const routes: Routes = [
  {
    path: "",
    component: AppLayoutComponent, //definizione della rotta principale
    children: [
      // {
      //   path: "anagrafica",
      //   loadChildren: () => import('../anagrafica/anagrafica-routing').then(m => m.routes),
      // },
      { path: '**', redirectTo: 'utenti', pathMatch: 'full' },
    ],
  },
];
