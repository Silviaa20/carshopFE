import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";

import { MatDialog } from "@angular/material/dialog"; //, MatDialogRef } from "@angular/material/dialog";
import { SigninService } from "../../../../../src/service/signin.service";
import {
  BUTTON_CONSTANT,
  ERRORS_CONSTANT,
  INPUT_CONSTANT,
  LABEL_CONSTANT,
} from "../../../../app/constants";
import { LoaderSpinnerService} from "../../..../../../../service/loader-spinner.service";
import {  LoginService,} from "../../..../../../../service/login.service";
import {  NotificationService} from "../../..../../../../service/notification.service";
import { Subscription } from "rxjs";
import { AngularMaterialModule } from "../../../../../src/app/utils";
import { WorkInProgressComponent } from "../../../../../src/app/shared";

/** Una classe per il componente del form di login */
@Component({
  standalone: true,
  selector: "app-sigin-form",
  templateUrl: "./signin-form.component.html",
  styleUrls: ["./signin-form.component.scss"],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AngularMaterialModule,
  ],
})
export default class SigninFormComponent {
  /** Costante delle label dei button */
  buttonConstant: any = BUTTON_CONSTANT;
  /** Costante delle label degli errori */
  errorsConstant: any = ERRORS_CONSTANT;
  /** Costante delle label degli input */
  inputConstant: any = INPUT_CONSTANT;
  /** Costante delle label generiche */
  labelConstant: any = LABEL_CONSTANT;

  /** Indica se la password deve essere mostrata in chiaro */
  hide: boolean = true;
  /** FormGroup per la registrazione */
  signinForm: FormGroup;

  /** Il riferimento alla modale aperta */
  //dialogRef!: MatDialogRef<any>;
  /** Regex no emoji */
  regex =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  /** Subscription all'evento di cambio valore dell'input della password */
  passwordValueSubscription!: Subscription;
  types: any;
  keys: any;

  constructor(
    private loaderSpinnerService: LoaderSpinnerService,
    private signinService: SigninService,
    private loginService: LoginService,
    //private dialog: MatDialogRef<SigninFormComponent>,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.signinForm = this.fb.group({
      id: "",
      username: [
        "",
        [
          Validators.required,
          //   Validators.pattern(
          //     /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
          //   ),
          Validators.minLength(2),
          Validators.maxLength(128),
        ],
      ],
      password: [
        "",
        [
          Validators.required,
          //   Validators.minLength(8),
          //   Validators.maxLength(64),
        ],
      ],
      usertype: [""],
    });

    this.passwordValueSubscription = this.signinForm.controls[
      "password"
    ].valueChanges.subscribe((value: any) => {
      this.signinForm.controls["password"].setValue(
        value.replace(this.regex, ""),
        {
          emitEvent: false,
        }
      );
    });
  }
  ngOnInit() {
    const userTypes = {
      ADMIN: 'admin',
      USER: 'user',
     };

    this.types = userTypes;
    this.keys = Object.keys(this.types);
  }

  /**
   * Lifecycle hook per l'onDestroy
   * Si annullano le iscrizione effettuate agli observable
   */
  ngOnDestroy() {
    if (this.passwordValueSubscription) {
      this.passwordValueSubscription.unsubscribe();
    }
  }

  /**
   * Submit del form di login.
   * Nella callback salva il nominativo dell'utente nel localStorage e il token nel localStorage o sessionStorage (in base alla selezione remember me).
   * Viene poi effettuata la navigazione alla dashboard
   */
  onSubmit() {
    this.loaderSpinnerService.show();
    if (this.signinForm.valid) {
      console.log("**********");
      this.signinService.signin(this.signinForm.value).subscribe({
        next: (res: any) => {
          console.log("++++++++++++++");
          this.loginService.setUtenteSession(
            res?.username,
            res?.usertype,
            res?.jwt
          );
          if (res.usertype == "user") {
            this.router.navigate(["/user"]);
            this.loaderSpinnerService.hide();
          } else if (res.usertype == "admin") {
            this.router.navigate(["/admin/impianti/getAllPersonalizzata"]);
            this.loaderSpinnerService.hide();
          } else if (res.usertype == "amministratore") {
            this.router.navigate(["/gestionale/utenti"]);
            //window.location.reload();
            this.loaderSpinnerService.hide();
          } else {
            console.error(
              res.usertype +
                " non è riferito a nessun tipo di usertype! Aggiusta il campo usertype nel db ;) "
            );
          }
        },
        error: (error: any) => {
          this.loaderSpinnerService.hide();
        },
      });
    } else {
      this.notificationService.show(ERRORS_CONSTANT.required, 2500, "error");
      this.loaderSpinnerService.hide();
    }
  }

  closeDialog() {
    //this.dialog.close(false);
  }

  navigateTo() {
    this.router.navigate(["/login"]);
  }
}
