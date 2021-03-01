import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Session } from 'src/app/models/Session';
import { HttpBilanParticipantSessionService } from 'src/app/services/http-bilan-participant-session.service';

@Component({
  selector: 'app-inscription-session',
  templateUrl: './inscription-session.component.html',
  styleUrls: ['./inscription-session.component.css']
})
export class InscriptionSessionComponent implements OnInit {

  @Input() session:Session;
  formInscriptionSession: FormGroup;
  isInscrit: Boolean = false;
  valeurInscription: any;
  valueForm: any;

  constructor(
    private httpBilanService: HttpBilanParticipantSessionService,
    private fb: FormBuilder) { 
    this.formInscriptionSession = this.fb.group({
      idParticipant: [],
      idSession: [],
      coordonneeParticipant: this.fb.group({
        codePostal: [""],
        mail: [""],
        numeroVoie: [""],
        pays: [""],
        telephone: [""],
        typeVoie: [""],
        ville: [""]
      }),
      entreprise: this.fb.group({
        siret:[""],
        nom:[""]
      }),
      coordonneeEntreprise: this.fb.group({
        codePostal: [""],
        mail: [""],
        numeroVoie: [""],
        pays: [""],
        telephone: [""],
        typeVoie: [""],
        ville: [""]
      })
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.valueForm = this.formInscriptionSession.value;
    console.log(this.valueForm);
    if(this.valueForm.coordonneeEntreprise == null){
      this.httpBilanService.saveParticulier(this.formInscriptionSession.value).subscribe( reponse => {
        this.valeurInscription = reponse;
      });
      console.log(this.valeurInscription);
      if (this.valeurInscription != null){
        this.isInscrit = true;
      }
    } else{
      console.log(this.valueForm);
      this.httpBilanService.saveEntreprise(this.formInscriptionSession.value).subscribe( reponse => {
        this.valeurInscription = reponse;
      });
      console.log(this.valeurInscription);
      if (this.valeurInscription != null){
        this.isInscrit = true;
      }
    }
  }
}
