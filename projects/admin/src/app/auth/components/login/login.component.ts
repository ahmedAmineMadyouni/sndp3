import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { loginResponse } from '../../context/DTOs';
import { AdminDataService } from '../../services/admin-data.service';
import { TasksService } from '../../../dashboard/tasks-admin/services/tasks.service';
import { UsersService } from '../../../dashboard/manage-users/services/users.service';
import { AffectationServiceService } from '../../../dashboard/affectation-admin/services/affectation-service.service';
import { ChauffeurService } from '../../../dashboard/chauffeur-admin/service/chauffeur.service';
import { VoitureService } from '../../../dashboard/voiture-admin/services/voiture.service';
import { EntretienService } from '../../../dashboard/manage-entretien/services/entretien.service';
import { FournisseurService } from '../../../dashboard/manage-fournisseur/services/fournisseur.service';
import { DeclarationService } from '../../../dashboard/declaration-admin/services/declaration.service';
import { forkJoin, take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup
  hidePassword: boolean = true;
  constructor(private forB:FormBuilder,
    private authService:LoginService,
    private  taskService:TasksService,
    private usersService:UsersService,
    private affectationService:AffectationServiceService,
    private chauffService:ChauffeurService,
    private voitService:VoitureService,
    private entretienService:EntretienService,
    private fournisseurServcie:FournisseurService,
    private declarationservice:DeclarationService,
     private toastr:ToastrService,
     private adminDataService:AdminDataService,
     private router:Router,
     private spinner: NgxSpinnerService) { 
   
  }
  

  ngOnInit(): void {
    this.createForm();
    //this.spinner.show();
    //setTimeout(() => {
      /** spinner ends after 5 seconds */
      //this.spinner.hide();
    //}, 1998);
  }

  createForm(){
    this.loginForm=this.forB.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })

  }
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  login() {
    this.spinner.show();
    this.authService.login(this.loginForm.value).pipe(take(1)).subscribe((res:any) => {
      console.log(res)
      if(res.statusCodeValue==200) {
        localStorage.setItem("token",JSON.stringify(res.body))
  
        const tasks$ = this.taskService.getTasks();
        const inProgressTask$=this.taskService.getStartedTasks();
        const canceledTask$=this.taskService.getCanceledTasks();
        const successTask$=this.taskService.getConfirmedTasks();
        const profiles$ = this.usersService.getProfiles();
        const affectation$ = this.affectationService.getAffectation();
        const voiture$ = this.affectationService.getNotAffectedVoiture();
        const chauffeur$ = this.affectationService.getNotAffectedChauffeur();
        const chauffeurService$ = this.chauffService.getChauffuer();
        const voitureService$ = this.voitService.getVoiture();
        const demandeEntretienNotApprovedYet$ = this.entretienService.getDemandeEntretienNotAprovedYet();
        const demandeEntretienConfirmed$ = this.entretienService.getAllNotValideDemandeEntretienConfirmed();
        const demandeEntretienCanceled$ = this.entretienService.getAllNotValideDemandeEntretienCanceled();
        const demandeEntretienInProgress$ = this.entretienService.getAllNotValideDemandeEntretienInProgress();
        const entretien$ = this.entretienService.getAllEntretien();
        const fournisseur$ = this.fournisseurServcie.getFournisseur();
        const declarationAccident$ = this.declarationservice.getAllDeclarationAccident();
        const declarationAmendes$ = this.declarationservice.getAllDeclarationAmendes();
        const validDeclarationAccident$ = this.declarationservice.getAllValideDeclarationAccident();
        const validDeclarationAmendes$ = this.declarationservice.getAllValideDeclarationAmendes();
        const Accident$ = this.declarationservice.getAllAccident();
        const Amendes$ = this.declarationservice.getAllAmendes();
        forkJoin([
          tasks$,
          //profiles$,
          affectation$,
          voiture$,
          chauffeur$,
          chauffeurService$,
          voitureService$,
          demandeEntretienNotApprovedYet$,
          //demandeEntretienConfirmed$,
          //demandeEntretienCanceled$,
          //demandeEntretienInProgress$,
          fournisseur$,
          declarationAccident$,
          declarationAmendes$,
          //inProgressTask$,
          //canceledTask$,
          //successTask$,
          entretien$,
          validDeclarationAccident$,
          validDeclarationAmendes$,
          Amendes$,
          Accident$

        ]).pipe(take(16)).subscribe(
          (results:any) => {
            this.adminDataService.setNewTaskData(results[0]);
            //this.adminDataService.setUsersData(results[1]);
            this.adminDataService.setAffectationData(results[1]);
            this.adminDataService.setNotAffectedVoitureData(results[2]);
            this.adminDataService.setNotAffectedChauffeurData(results[3]);
            this.adminDataService.setChauffeurData(results[4]);
            this.adminDataService.setVoitureData(results[5]);
            this.adminDataService.setNotAprovedDemandeEntretienData(results[6]);
            //this.adminDataService.setSuccessDemandeEntretienData(results[8]);
            //this.adminDataService.setCanceledDemandeEntretienData(results[9]);
            //this.adminDataService.setInProgressDemandeEntretienData(results[10]);
            this.adminDataService.setFournisseurData(results[7]);
            this.adminDataService.setNotValideDeclarationAccidentData(results[8]);
            this.adminDataService.setNotValideDeclarationAmendesData(results[9]);
            //this.adminDataService.setInProgressTaskData(results[14]);
            //this.adminDataService.setCanceledTaskData(results[15]);
            //this.adminDataService.setSuccessTaskData(results[16])
            this.adminDataService.setEntretienData(results[10]);
            this.adminDataService.setvalidatedDeclarationAccidentData(results[11]);
            this.adminDataService.setValidatedDeclarationAmendesData(results[12]);
            this.adminDataService.setAmendesData(results[13]);
            this.adminDataService.setAccidentData(results[14]);
            this.toastr.success("Success","You Have Loged in successfully")
            this.router.navigate(['/tasks'])
          },
          (error) => {
            alert('email or password incorrect')
            this.spinner.hide();
            this.toastr.error(error.error.message)
          },
          () => {
            this.spinner.hide();
          }
        );
  
      }
    });
  }
/**   
  login(){
    this.spinner.show();
    this.authService.login(this.loginForm.value).subscribe((res:any) => {
      if(res.statusCodeValue==200){
        localStorage.setItem("token",JSON.stringify(res.body))
        this.taskService.getTasks().subscribe((res:any)=>{
          this.adminDataService.setNewTaskData(res);

        });
        this.usersService.getProfiles().subscribe((res:any)=>{
          this.adminDataService.setUsersData(res);

        });
        this.affectationService.getAffectation().subscribe((res:any)=>{
          this.adminDataService.setAffectationData(res);
        });
        this.affectationService.getNotAffectedVoiture().subscribe((res:any)=>{
          this.adminDataService.setNotAffectedVoitureData(res);
        });
        this.affectationService.getNotAffectedChauffeur().subscribe((res:any)=>{
          this.adminDataService.setNotAffectedChauffeurData(res);
        });
        this.chauffService.getChauffuer().subscribe((res:any)=>{
          this.adminDataService.setChauffeurData(res);
        });
        this.voitService.getVoiture().subscribe((res:any)=>{
          this.adminDataService.setVoitureData(res);
        });
        this.entretienService.getDemandeEntretienNotAprovedYet().subscribe((res:any)=>{
          this.adminDataService.setNotAprovedDemandeEntretienData(res);
        });
        this.entretienService.getAllNotValideDemandeEntretienConfirmed().subscribe((res:any)=>{
          this.adminDataService.setSuccessDemandeEntretienData(res);
        });
        this.entretienService.getAllNotValideDemandeEntretienCanceled().subscribe((res:any)=>{
          this.adminDataService.setCanceledDemandeEntretienData(res)
        });
        this.entretienService.getAllNotValideDemandeEntretienInProgress().subscribe((res:any)=>{
          this.adminDataService.setInProgressDemandeEntretienData(res);
        });
        this.fournisseurServcie.getFournisseur().subscribe((res:any)=>{
          this.adminDataService.setFournisseurData(res);
        });
        this.declarationservice.getAllDeclarationAccident().subscribe((res:any)=>{
          this.adminDataService.setNotValideDeclarationAccidentData(res);
        });
        this.declarationservice.getAllDeclarationAmendes().subscribe((res:any)=>{
          this.adminDataService.setNotValideDeclarationAmendesData(res);
        });
        

      }
      
     this.toastr.success("Success","You Have Loged in successfully")
     this.router.navigate(['/tasks'])
     this.spinner.hide();

    },error =>{
      alert('email or password incorrect')
      this.spinner.hide();
      this.toastr.error(error.error)
    })
    console.log(this.loginForm.value);
  }*/

}
