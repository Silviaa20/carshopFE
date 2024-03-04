import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "login", // Modifica qui: da 'gestionale' a 'login'
        pathMatch: "full",
      },
      {
        path: "gestionale",
        loadChildren: () =>
          import("../modules/app-layout/app-layout-routing").then(
            (m) => m.routes
          ),
      },
      {
        path: "admin",
        loadChildren: () =>
          import("../modules/app-layout-admin/app-layout-admin-routing").then(
            (m) => m.routes
          ),
      },
      {
        path: "user",
        loadChildren: () =>
          import("../modules/app-layout-user/app-layout-user-routing").then(
            (m) => m.routes
          ),
      },
      {
        path: "login",
        loadChildren: () =>
          import("./login/login-routing").then((m) => m.routes),
      },
    ],
  },
  { path: "**", redirectTo: "login", pathMatch: "full" },
];
