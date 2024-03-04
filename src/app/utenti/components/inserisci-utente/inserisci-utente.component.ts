import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "../../../../../src/app/utils";
import { CommonModule } from "@angular/common";
import { MatDialogRef } from "@angular/material/dialog";
import { UtentiService } from "../../../../../src/service/utenti.service";
import { FormsModule } from "@angular/forms";
import { LoginService } from "../../../../../src/service/login.service";

@Component({
  selector: "app-inserisci-utente",
  templateUrl: "./inserisci-utente.component.html",
  styleUrls: ["./inserisci-utente.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class InserisciUtenteComponent {
  isModifica: boolean = false;
  inserimentoUtente: FormGroup;
  types: any;
  keys: any;
  userSession: any;
  oldUsername: any;

  constructor(
    private dialog: MatDialogRef<InserisciUtenteComponent>,
    private utentiService: UtentiService,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
    this.inserimentoUtente = this.fb.group({
      id: "",
      username: [""],
      password: [""],
      usertype: [""],
    });
    this.userSession = this.loginService.getUtenteSessione();
  }

  ngOnInit() {
    const userTypes = {
      ADMIN: 'admin',
      USER: 'user',
      AMMINISTRATORE: 'amministratore'
    };

    this.types = userTypes;
    this.keys = Object.keys(this.types);
  }

  submitForm() {
    const formValue = this.inserimentoUtente.value;
    if (this.isModifica) {
      this.utentiService.modifica(formValue, formValue.id).subscribe({
        next: (res) => {
          if (this.userSession.username === this.oldUsername){
          this.loginService.setUtenteSession(res.username, res.usertype, res.jwt)}
          window.location.reload();
        },
        error: (error: any) => {
          console.error("Errore durante la modifica dell'utente", error);
        },
      });
    } else {
      this.utentiService.insert(formValue).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (error: any) => {
          console.error("Errore durante l'inserimento dell'utente", error);
        },
      });
    }
  }

  setInserimento() {
    this.isModifica = false;
  }

  setModifica(id: number) {
    this.isModifica = true;
    this.utentiService.getUtente(id).subscribe({
      next: (res: any) => {
        this.oldUsername = res.username;
        this.inserimentoUtente = this.fb.group({
          id: res.id,
          username: res.username,
          usertype: res.usertype,
          password: "", //res.password,
        });
      },
    });
  }
  closeDialog() {
    this.dialog.close(false);
  }
}
