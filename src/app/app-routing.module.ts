import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: '', //nell'url
        component: LoginComponent, // Specifica il componente da caricare
        data: { title: 'Home prodotto' } // Puoi utilizzare 'data' per passare eventuali dati aggiuntivi alla rotta
    }
];
