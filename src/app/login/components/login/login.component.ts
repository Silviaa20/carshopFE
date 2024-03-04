import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/** Una classe per il componente del layout quando non si è loggati */
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [RouterModule],
})
export default class LoginComponent {}
