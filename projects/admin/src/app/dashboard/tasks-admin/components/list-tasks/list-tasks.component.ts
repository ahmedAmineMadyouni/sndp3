import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminDataService } from 'projects/admin/src/app/auth/services/admin-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
 
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator; // ViewChild for MatPaginator

  displayedColumns: string[] = ['position','description', 'title', 'user' ,'adresse','codePostal','deadLineDate','status', 'actions'];
  dataSource : any;
  canceledDataSource : any;
  successDataSource : any;
  inProgressDataSource : any;
  tasksFilter!:FormGroup
  users:any 

  status:any = [
    {name:"Complete" , id:1},
    {name:"In-Prossing" , id:2},
  ]
  constructor(private toastr:ToastrService,
    private dialog: MatDialog ,
    private spinner: NgxSpinnerService,
    private dataservice:AdminDataService,
    private fb:FormBuilder,
    private service :TasksService) { }

  ngOnInit(): void {
    this.loadTaskData()
    //this.createform();
    //this.getAllTasks();
   // this.getAllProfiles()
  }
  updateTask(element:any){
    if(element.missionStatus==="NEW_TASK"){
  
    const dialogRef= this.dialog.open(AddTaskComponent,{
      width:'750px',
      height:'700px',
      //disableClose:true
      data:element,
    })
  
    dialogRef.afterClosed().subscribe((res:any)=>{
      if(res==true){
        this.loadAfterUpdate()
      }
    })
  }else{
    this.toastr.warning("warning"," you can't delete a task that is already in progress")
  }
  }

  loadInProgressData(){
    this.dataservice.inProgressTaskData$.subscribe(data=>{
      this.inProgressDataSource=data;
      if(data==null){
        this.spinner.show()
        this.service.getStartedTasks().pipe(take(1)).subscribe((res:any)=>{
          this.dataservice.setInProgressTaskData(res);
          this.dataservice.inProgressTaskData$.subscribe(resData=>{
            this.inProgressDataSource=resData;
          })
          this.spinner.hide()
        })
      }else{
        this.service.getStartedTasks().pipe(take(1)).subscribe((res:any)=>{
          if(JSON.stringify(res)!==JSON.stringify(data)){
            this.dataservice.setInProgressTaskData(res);
            this.dataservice.inProgressTaskData$.subscribe(dataRes=>{
              this.inProgressDataSource=dataRes;
            })
          }
        })
      }
    })
  }

  loadAfterUpdate(){
    this.spinner.show()
    this.service.getTasks().pipe(take(1)).subscribe((res:any)=>{
      this.dataservice.setNewTaskData(res);
            this.dataSource= new MatTableDataSource(res)
            this.dataSource.paginator=this.paginator
            this.spinner.hide()
          
    })
  }

  loadSucessTaskData(){
    this.dataservice.successTaskData$.subscribe(data=>{
      this.successDataSource=data;
      if(data==null){
        this.spinner.show()
        this.service.getConfirmedTasks().subscribe((res:any)=>{
          this.dataservice.setSuccessTaskData(res);
         
            this.successDataSource=res;
          
          this.spinner.hide()
        })
      }else{
        this.service.getConfirmedTasks().pipe(take(1)).subscribe((res:any)=>{
          if(JSON.stringify(res)!==JSON.stringify(data)){
            this.dataservice.setSuccessTaskData(res);
            this.dataservice.successTaskData$.subscribe(dataRes=>{
              this.successDataSource=dataRes;
            })
          }
        })
      }
    })
  }

  loadCanceledTaskData(){
    this.dataservice.canceledTaskData$.subscribe(data=>{
      this.canceledDataSource=data;
      if(data==null){
        this.spinner.show()
        this.service.getCanceledTasks().subscribe((res:any)=>{
          this.dataservice.setCanceledTaskData(res);
          this.dataservice.canceledTaskData$.subscribe(resData=>{
            this.canceledDataSource=resData;
          })
          this.spinner.hide()
        })
      }else{
        this.service.getCanceledTasks().subscribe((res:any)=>{
          if(JSON.stringify(res)!==JSON.stringify(data)){
            this.dataservice.setCanceledTaskData(res);
            this.dataservice.canceledTaskData$.subscribe(dataRes=>{
              this.canceledDataSource=dataRes;
            })
          }
        })
      }
    })
  }

  deleteTask(element:any){
    this.spinner.show()
    if(element.missionStatus=="IN_PROGRESS"){
      this.spinner.hide()
      this.toastr.warning("warning","you can't delete a task that is already in progress")
    }else{
      this.service.deleteTask(element.idMission).pipe(take(1)).subscribe((res:any)=>{
        this.loadAfterUpdate() 
        this.toastr.success("success","you have deleted mission "+element.titre+"  successfully")
        this.spinner.hide()
      })
    }
    //this.spinner.show()
    console.log(element);
  }

  loadTaskData(){
    this.dataservice.newTaskData$.subscribe(data=>{
      
      if(data==null){
        this.spinner.show()
        this.service.getTasks().pipe(take(1)).subscribe((res:any)=>{
          if(JSON.stringify(res)!==JSON.stringify(data)){
          this.dataservice.setNewTaskData(res);
            this.dataSource= new MatTableDataSource(res)
            if(this.dataSource.paginator==null&&this.paginator!=null){this.dataSource.paginator=this.paginator}else{}
          }
          this.spinner.hide()
        })
      }else{
        this.dataSource=new MatTableDataSource(data)
      if(this.dataSource.paginator==null&&this.paginator!=null){this.dataSource.paginator=this.paginator}else{}
      }
    })
  }

  /**createform() {
    this.tasksFilter = this.fb.group({
      title:[''],
      userId:[''],
      fromDate:[''],
      toDate:['']
    })
  }**/

   
  addTask(){
    const dialogRef = this.dialog.open(AddTaskComponent,{
      width: '555px',
        height: '700px',
           //disableClose: true
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result==true) {
        this.loadAfterUpdate()
      }
    })
  }
  











  getAllTasks() {
    if("mission"in localStorage){
      this.dataSource=new MatTableDataSource(JSON.parse(localStorage.getItem("mission")!));
      //console.log(this.dataSource)
    }
    this.service.getTasks().subscribe((res:any)=>{//console.log(res)
      let myStorage=window.localStorage;
      if(!( "mission"  in localStorage)){
        myStorage.setItem("mission",JSON.stringify(res))
      this.dataSource = new MatTableDataSource(JSON.parse(localStorage.getItem("mission")!));
      this.dataSource.paginator = this.paginator;}
  
    }, error=> {

    })

  }
}
