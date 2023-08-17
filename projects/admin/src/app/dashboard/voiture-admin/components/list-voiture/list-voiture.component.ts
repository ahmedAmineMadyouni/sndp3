import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { VoitureService } from '../../services/voiture.service';
import { MatTableDataSource } from '@angular/material/table';
import { AddVoitureComponent } from '../add-voiture/add-voiture.component';
import { AdminDataService } from 'projects/admin/src/app/auth/services/admin-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-list-voiture',
  templateUrl: './list-voiture.component.html',
  styleUrls: ['./list-voiture.component.scss']
})
export class ListVoitureComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator; // ViewChild for MatPaginator


  displayedColumns:String[]=['idVoiture','MatriculeV','type','libelleMarque','libellemodele','nbrCylindre','CarteGrise','actions']
  dataSource:any
  constructor(private toastr:ToastrService,
     private spinner: NgxSpinnerService ,
     private dialog: MatDialog ,
     private dataservice:AdminDataService,
     private fb:FormBuilder,
     private service:VoitureService) { }

  ngOnInit(): void {
   this.loadVoitureData()
    //this.getVoiture();
  }
  updateVoiture(element:any){
    const dialogRef = this.dialog.open(AddVoitureComponent,{
      width:'750px',
      height: '700px',
      //disableClose: true
      data:element,
    });
    dialogRef.afterClosed().subscribe((res:any) =>{
      if(res==true){
        
      this.loadAfterUpdate();}

    })
  }
  loadAfterUpdate(){
    this.spinner.show()
    this.service.getVoiture().pipe(take(1)).subscribe((res:any)=>{
      this.dataservice.setVoitureData(res);
        this.dataSource=new MatTableDataSource(res);
        if(this.dataSource.paginator==null&&this.paginator!=null){ this.dataSource.paginator=this.paginator}else{}
      this.spinner.hide()
    })
  }
  loadVoitureData(){
    this.dataservice.voitureData$.subscribe(data=>{
      if(data==null){
        this.spinner.show()
        this.service.getVoiture().pipe(take(1)).subscribe((res:any)=>{
          if(JSON.stringify(res)!== JSON.stringify(data)){
          this.dataservice.setVoitureData(res);
            this.dataSource=new MatTableDataSource(res);
            if(this.dataSource.paginator==null&&this.paginator!=null){ this.dataSource.paginator=this.paginator}else{}
          }
            this.spinner.hide() 
        })
      }else{
        this.dataSource=new MatTableDataSource(data);
        if(this.dataSource.paginator==null&&this.paginator!=null){ this.dataSource.paginator=this.paginator}else{}
      }
    })
  }

  /**getVoiture(){
   if("voiture"in sessionStorage){
      this.dataSource=new MatTableDataSource(JSON.parse(sessionStorage.getItem("voiture")!));
      console.log(this.dataSource)
    }
    this.service.getVoiture().subscribe((res:any)=>{
      console.log(res)
      let myStorage=window.sessionStorage;
      const stringifiedRes = JSON.stringify(res);
      if(stringifiedRes !== myStorage.getItem("voiture")){
        myStorage.setItem("voiture",JSON.stringify(res))
      this.dataSource = new MatTableDataSource(JSON.parse(sessionStorage.getItem("voiture")!));
      this.dataSource.paginator = this.paginator;}
//todo na7i el ecrassement de local storage
     // console.log(JSON.parse(localStorage.getItem("voiture")!));
    }, error=> {

    })
  }*/

  
  deleteVoiture(element:any){
    this.spinner.show()
      this.service.checkVoitureStatus(element.idVoiture).subscribe((res:any)=>{
        if(res==false){
          this.service.deleteVoiture(element.idVoiture).subscribe((res:any)=>{
            if(res==null){
            this.loadAfterUpdate()
            this.spinner.hide()
            this.toastr.success("success","you have deleted Voiture  "+element.libelleMarque+"  successfully")}
           })
        }else{
          this.spinner.hide()
          this.toastr.warning("warning"," you can't delete a car that is already in a IN_PROGRESS missionStatus")
        }
      })
      
    
  }


  addVoiture(){
    const dialogRef = this.dialog.open(AddVoitureComponent,{
      width:'750px',
      height: '700px',
      //disableClose: true
    });
    dialogRef.afterClosed().subscribe((res:any) =>{
      if(res==true){
      this.loadAfterUpdate();}

    })
  }
  }