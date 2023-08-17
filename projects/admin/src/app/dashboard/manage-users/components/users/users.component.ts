import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { UsersService } from '../../services/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { AdminDataService } from 'projects/admin/src/app/auth/services/admin-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator; // ViewChild for MatPaginator

  displayedColumns: string[] = ['position', 'name', 'email' ,'tasksAssigned', 'actions'];
  dataSource :any;
  constructor(private dataservice:AdminDataService,private service:UsersService,private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
   this.loadUsersData()
    //this.getAllProfiles()
  }
  loadUsersData(){
    this.dataservice.usersData$.subscribe(data=>{
      
      if(data==null){
        this.spinner.show()
        this.service.getProfiles().pipe(take(1)).subscribe((res:any)=>{
          if(JSON.stringify(res)!==JSON.stringify(data)){
          this.dataservice.setUsersData(res);
          this.dataSource=new MatTableDataSource(res);
        
          if(this.dataSource.paginator==null&& this.paginator!=null){this.dataSource.paginator=this.paginator}else{}
        }
          
          this.spinner.hide()
        })
      }else{this.dataSource=data
        if(this.dataSource.paginator==null&& this.paginator!=null){this.dataSource.paginator=this.paginator}else{}}
    })
  }


  /**getAllProfiles() {
   
    if("profiles"in localStorage){
      this.dataSource= new MatTableDataSource(JSON.parse(localStorage.getItem("profiles")!));
      
      console.log(this.dataSource.data)
    }this.service.getProfiles().subscribe((res:any)=>{
      const myStorage1 = window.localStorage;
      const stringifiedRes1 =JSON.stringify(res);
      if(stringifiedRes1 !== myStorage1.getItem("profiles")){
        myStorage1.setItem("profiles",stringifiedRes1)
        this.dataSource=new MatTableDataSource(JSON.parse(stringifiedRes1))
        this.dataSource.paginator=this.paginator
      }
    
    })
  }*/




  

}
