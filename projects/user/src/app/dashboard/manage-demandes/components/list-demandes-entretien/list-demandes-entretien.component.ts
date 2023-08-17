import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DemandesService } from '../../services/demandes.service';
import { MatTableDataSource } from '@angular/material/table';
import { AddDemandesEntretienComponent } from '../add-demandes-entretien/add-demandes-entretien.component';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../../../tasks/services/data.service';
import { ResponseService } from 'projects/user/src/app/auth/services/response.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-list-demandes-entretien',
  templateUrl: './list-demandes-entretien.component.html',
  styleUrls: ['./list-demandes-entretien.component.scss']
})
export class ListDemandesEntretienComponent implements OnInit {
  
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator; // ViewChild for MatPaginator
  displayedColumns: string[] = ['idDemandeEntretien' ,'description','obligation','type','status','voiture','chauff', 'dateDemandes','actions'];
  dataSource :any
  constructor(private toastr:ToastrService,
    private spinner:NgxSpinnerService,
     private dialog: MatDialog,
     private fb:FormBuilder,
     private service:DemandesService,
     private res:ResponseService) { }


  ngOnInit(): void {
    
   this.loadDemandeData()
  }
  loadDemandeData(){
    this.res.notAprovedDemandeData$.pipe(take(1)).subscribe(data=>{
      if(data==null){
        this.spinner.show()
      this.service.getAllNotYetValdiatedDemande(JSON.parse(localStorage.getItem("token")!).idConducteur).subscribe((res:any)=>{
        //console.log(res)
        if(JSON.stringify(res)!== JSON.stringify(data)){
          this.res.setNotAprovedDemandeData(res);
            this.dataSource=new MatTableDataSource(res)
            if(this.dataSource.paginator==null&& this.paginator!=null){this.dataSource.paginator=this.paginator;}else{}
        }
        this.spinner.hide()
      });
    }else{this.dataSource=new MatTableDataSource(data);
      if(this.dataSource.paginator==null&& this.paginator!=null){this.dataSource.paginator=this.paginator;}else{}
    }
    })
  }

  updateDemandeEntretien(element:any){
    if(element.completed!=='CANCELED'){
    const dialogRef = this.dialog.open(AddDemandesEntretienComponent,{
      width: '755px',
      height: '750px',
         //disableClose: true
         data:element
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result==true) {
        this.loadAfterUpdate()
      }
    })
  }else{
    this.toastr.warning("you can not upate a canceled demande ")
  }
  }


  deleteDemandeEntretien(element:any){
    this.spinner.show()
    this.service.getDemandeEntretienById(element.idDemandeEntretien).pipe(take(1)).subscribe((res:any)=>{
      if(res.completed==null|| res.completed==='CANCELED'){
        this.service.deleteDemandeEntretien(element.idDemandeEntretien).pipe(take(1)).subscribe((res:any)=>{
          console.log(res)
          this.toastr.success("success","you have deleted demande with id :"+element.idDemandeEntretien+" successfuly")
                this.spinner.hide()
                this.loadAfterUpdate()
        })
        
      }else{
      this.spinner.hide()
      this.toastr.warning("you can not delete an aproved demande data ","")
      this.loadAfterUpdate()    
    }
    })
    /** */
  }
  loadAfterUpdate(){
    this.spinner.show()
    this.service.getAllNotYetValdiatedDemande((JSON.parse(localStorage.getItem("token")!).idConducteur)).pipe(take(1)).subscribe((res:any)=>{
      this.res.setNotAprovedDemandeData(res);
      this.dataSource=new MatTableDataSource(res);
      if(this.dataSource.paginator==null&& this.paginator!=null){this.dataSource.paginator=this.paginator;}else{}
      this.spinner.hide()
    })
  }


  getAllEntretien(){
    this.service.getAllNotYetValdiatedDemande((JSON.parse(localStorage.getItem("token")!).idConducteur)).subscribe((res:any)=>{
      const myStorage1 = window.localStorage;
      const stringifiedRes1 =JSON.stringify(res);
      if(stringifiedRes1 !== myStorage1.getItem("notAprovedDemandeData")){
        this.res.setNotAprovedDemandeData(res);
        this.res.notAprovedDemandeData$.subscribe(data=>{
          this.dataSource=data;
        })
      }
      //this.dataSource= new MatTableDataSource(res)
      //console.log(this.dataSource)
    })
  }
  addEntretienDemande(){
    const dialogRef = this.dialog.open(AddDemandesEntretienComponent,{
      width:'750px',
      height:'750px'
    });
    dialogRef.afterClosed().subscribe((res:any)=>{
      if(res==true){
        this.loadAfterUpdate()
      }
    })

  }

}
