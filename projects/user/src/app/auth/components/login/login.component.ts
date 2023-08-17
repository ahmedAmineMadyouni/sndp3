import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../../../dashboard/tasks/services/tasks.service';
import { DemandesService } from '../../../dashboard/manage-demandes/services/demandes.service';
import { DataService } from '../../../dashboard/tasks/services/data.service';
import { forkJoin } from 'rxjs';
import { ResponseService } from '../../services/response.service';
import { DeclarationService } from '../../../dashboard/manage-declaration/services/declaration.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup
  data1!:[]
  data2!:[]
  showPassword=false
  constructor(private forB:FormBuilder,
    private authService:LoginService,
    private declarationService:DeclarationService,
    private taskService: TasksService,
    private demandeService:DemandesService,
    //private dataService:DataService,
    private resService: ResponseService,
     private toastr:ToastrService,
     private router:Router,
     private spinner: NgxSpinnerService) { 
   
  }

  ngOnInit(): void {
    this.createForm();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  createForm(){
    this.loginForm=this.forB.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })

  }
  login(){
    
    this.spinner.show();
    this.authService.login(this.loginForm.value).subscribe((res:any) => {
      if(res.statusCodeValue==200){
      localStorage.setItem("token",JSON.stringify(res.body))
      const tasks$ =this.taskService.getUserMissions(res.body.idAffectations);
      const notAprovedDeclarationAccident$ =this.declarationService.getDeclarationAccident(res.body.idConducteur);
      const notAprovedDeclarationAmendes$= this.declarationService.getDeclarationAmendes(res.body.idConducteur);
      const notAprovedDemandeEntretien$ =this.demandeService.getAllNotYetValdiatedDemande(res.body.idConducteur);
      const aprovedDemande$=this.demandeService.getAllValdiatedDemande(res.body.idConducteur);
      forkJoin([
        tasks$,
        notAprovedDeclarationAccident$,
        notAprovedDeclarationAmendes$,
        notAprovedDemandeEntretien$,
        aprovedDemande$
      ]).subscribe((results:any)=>{
        this.resService.setTaskData(results[0]);
        this.resService.setNotAprovedDeclarationAccidentData(results[1]);
        this.resService.setNotAprovedDeclarationAmendesData(results[2]);
        this.resService.setNotAprovedDemandeData(results[3]);
        this.resService.setAprovedDemandeData(results[4]);
        
        this.spinner.hide();
        this.toastr.success("Success","You Have Loged in successfully")
        this.router.navigate(['/tasks'])
      }, (error)=>{
        alert('email or password incorrect')
        this.spinner.hide();
        this.toastr.error(error.error.message)
      },() => {
        this.spinner.hide();
      }
      );

    
    }

    });
    //console.log(this.loginForm.value);
  }

 
}
