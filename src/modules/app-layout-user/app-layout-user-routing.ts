import { Routes } from "@angular/router";
import AppLayoutComponent from "./components/app-layout/app-layout.component";

export const routes: Routes = [
  {
    path: "",
    component: AppLayoutComponent,
    children: [
      
      {
        path: "profilo",
        loadChildren: () =>
          import("../../app/profilo/profilo-routing").then((m) => m.routes),
      },
      { path: "**", redirectTo: "utenti", pathMatch: "full" },
    ],
  },
];
