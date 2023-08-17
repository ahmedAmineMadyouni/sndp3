import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DemandesService } from '../../services/demandes.service';
import { ResponseService } from 'projects/user/src/app/auth/services/response.service';
import { take } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-entretien-user',
  templateUrl: './list-entretien-user.component.html',
  styleUrls: ['./list-entretien-user.component.scss']
})
export class ListEntretienUserComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator; // ViewChild for MatPaginator
  displayedColumns: string[] = ['IdEntretien' ,'libellee','detail','type','voiture','societe', 'DateE'];
  dataSource :any
  constructor(private toastr:ToastrService,
    private spinner:NgxSpinnerService,
     private service:DemandesService,
     private dataService:ResponseService) { }

  ngOnInit(): void {
    this.loadEntretienData()
  }

  loadEntretienData(){
    this.dataService.entretienData$.pipe(take(1)).subscribe(data=>{
      if(data==null){
        this.spinner.show()
      this.service.getAllCompletedDemandeEntretien((JSON.parse(localStorage.getItem("token")!).idConducteur)).pipe(take(1)).subscribe((res:any)=>{
        if(JSON.stringify(res)!== JSON.stringify(data)){
          this.dataService.setEntretienData(res);
          this.dataSource=new MatTableDataSource(res)
          if(this.dataSource.paginator==null && this.paginator!=null){this.dataSource.paginator = this.paginator;}else{}
        }
        this.spinner.hide()
      })
    }else{ this.dataSource= new MatTableDataSource(data)
      console.log(this.dataSource)
      if(this.dataSource.paginator==null && this.paginator!=null){this.dataSource.paginator = this.paginator;}else{}}
    })
  }

  
 




}
