import { Routes } from "@angular/router";
import AppLayoutComponent from "../app-layout-admin/components/app-layout-admin/app-layout-admin.component";

export const routes: Routes = [
  {
    path: "",
    component: AppLayoutComponent,
    children: [
      {
        path:"profilo",
        loadChildren: () =>
          import("../../app/profilo/profilo-routing").then((m) => m.routes),
      },
      { path: "**", redirectTo: "ptofilo", pathMatch: "full" },
    ],
  },
];
