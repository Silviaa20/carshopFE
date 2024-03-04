import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../../../../src/app/utils';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { AnagraficaComponent } from '../anagrafica/anagrafica.component';
import { MatFormFieldControl } from '@angular/material/form-field';
import { AnagraficaService } from '../../../../../src/service/anagrafica.service';
import { ActivatedRoute } from '@angular/router';
import { UtentiService } from '../../../../../src/service/utenti.service';
import { LoginService } from '../../../../../src/service/login.service';


@Component({
  selector: 'app-modifica-impianto',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './modifica-anagrafica.component.html',
  styleUrls: ['./modifica-anagrafica.component.scss']
})
export class ModificaAnagraficaComponent {
  anagNotExist:boolean;
  userlist : any[] = [];
  idAnagToMod : number;
  modificaAnagrafica: FormGroup;
  userSession:any;
  userName:any;
  constructor(
    private dialog: MatDialogRef<ModificaAnagraficaComponent>, 
    private anagraficaService: AnagraficaService,
    private utentiService: UtentiService,
    private activatedRoute: ActivatedRoute,
    private loginService:LoginService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
    ) {
      this.idAnagToMod = 0;
      this.modificaAnagrafica = this.fb.group({
        //id: [''],
        nome:[''],
        cognome: [''],
        indirizzo:[''],
        dataNascita:[''],
        luogoNascita:[''],
        user:['', Validators.required]
      });
      this.anagNotExist = false;
      this.userSession = this.loginService.getUtenteSessione();
    }

    ngOnInit() {  
      
    }

    setModificaAnagrafica(id: number){
      this.anagraficaService.getUserWoAnag().subscribe({
        next: (res: any[]) => {
          this.userlist = res;
          if (id !== 0){
            this.anagraficaService.readAnagrafica(id).subscribe({
              next: (res: any) => {
                if (res.user) {
                  this.userlist.push(res.user);
                  this.userName=(this.loginService.getUtenteSessione()).username;
                }
                this.modificaAnagrafica = this.fb.group({
                    id: id,
                    nome: res.nome,
                    cognome: res.cognome,
                    indirizzo: res.indirizzo,
                    dataNascita: res.dataNascita,
                    luogoNascita: res.luogoNascita,
                    user: res.user ? res.user.id : '-'
                  });
                },
              });
            } else {
              this.anagNotExist = true;
              this.utentiService.getUtenteByUsername(this.userSession.username).subscribe({
                next: (res: any) => {
                  this.userName = res.username;
                  this.modificaAnagrafica = this.fb.group({
                    id: "",
                    nome: "",
                    cognome: "",
                    indirizzo: "",
                    dataNascita: "",
                    luogoNascita: "",
                    user: res.id,
                  });
                }
              });
            }
        },
        error: (error: any) => {
          console.error(error);
        }
      });

    this.cd.detectChanges;
    }

  submitForm() {
    const formValue = this.modificaAnagrafica.value;
    this.anagraficaService.insertAnagrafica(formValue).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error: any) => {
        console.error("Errore durante l'inserimento anagrafica", error);
      },
    });  
  }

  closeDialog() {
    this.dialog.close(false);
  }
  
}
