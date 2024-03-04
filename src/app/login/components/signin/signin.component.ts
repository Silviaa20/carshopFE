import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

/** Una classe per il componente del layout quando non si è loggati */
@Component({
  standalone: true,
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  imports: [RouterModule],
})
export default class SigninComponent {

  constructor(
    private router: Router,
  ) {}

  ngOnInit(){
    this.router.navigate(["/login/signin"]);
  }
}
