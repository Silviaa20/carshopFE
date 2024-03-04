import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../../../../src/app/utils';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { AnagraficaComponent } from '../anagrafica/anagrafica.component';
import { MatFormFieldControl } from '@angular/material/form-field';
import { AnagraficaService } from '../../../../../src/service/anagrafica.service';
import { ActivatedRoute } from '@angular/router';
import { UtentiService } from '../../../../../src/service/utenti.service';


@Component({
  selector: 'app-inserisci-impianto',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
  templateUrl: './inserisci-anagrafica.component.html',
  styleUrls: ['./inserisci-anagrafica.component.scss']
})
export class InserisciAnagraficaComponent {

  userlist : any[] = [];

  
  inserimentoAnagrafica: FormGroup;
  userDTO: FormGroup;

  constructor(
    private dialog: MatDialogRef<InserisciAnagraficaComponent>, 
    private anagraficaService: AnagraficaService,
    private activatedRoute: ActivatedRoute,
    private userService:UtentiService,
    private fb: FormBuilder,
    ) {
      this.inserimentoAnagrafica = this.fb.group({
        //id: [''],
        nome:[''],
        cognome: [''],
        indirizzo:[''],
        dataNascita:[''],
        luogoNascita:[''],
        user:['']
      });

      this.userDTO = this.fb.group({
        id:[''],
        username:[''],
        password:[''],
        usertype:['']
      })
    }

    ngOnInit() {
      let userlist = this.anagraficaService.getUserWoAnag().subscribe({
        next: (res:any) =>{
          this.userlist = res;
        }
      });
    }

  submitForm() {
    const formValue = this.inserimentoAnagrafica.value;
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
