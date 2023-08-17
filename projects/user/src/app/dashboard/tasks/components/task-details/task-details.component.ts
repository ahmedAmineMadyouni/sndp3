import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { Location } from '@angular/common';
import { DataService } from '../../services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
 data:any

  constructor(private dataService:DataService ,private route: ActivatedRoute,
    private location: Location,
    private spinner:NgxSpinnerService,
    private toaster :ToastrService,
    private service:TasksService) { }
  ngOnInit(): void {
    this.loadAfterUpdateTask()

  }

  loadAfterUpdateTask(){
    this.dataService.data$.subscribe(data => {
      this.data = data;
      console.log(data)
    });
  }
  startTask(element:any){
    this.spinner.show()
    this.service.startMissionById(element.idMission).pipe(take(1)).subscribe((res:any)=>{
      if(res){
        
        this.dataService.setData(res);
        this.loadAfterUpdateTask()
        this.spinner.hide()
        this.toaster.success("success","you have started this "+ element.titre+ " mission with success congratulation")
      }
    },error => {
      this.toaster.error(error.error.message)
    })

  }

  cancelTask(element:any){
    if(element.missionStatus==='IN_PROGRESS'){
      this.spinner.show()
      this.service.cancelMission(element.idMission).pipe(take(1)).subscribe((res:any)=>{
        if(res){
          this.toaster.success("success","you have canceled this "+ res.missionStatus+ " mission with success congratulation")
          this.spinner.hide()
          this.goBack()
        }
      },error => {
        this.toaster.error(error.error.message)
      })
    }
  }
  completeTask(element:any){
    if(element.missionStatus==='IN_PROGRESS'){
      this.spinner.show()
      this.service.completeMissionById(element.idMission).pipe(take(1)).subscribe((res:any)=>{
        if(res){
          this.toaster.success("success","you have completed this "+ res.missionStatus+ " mission with success congratulation")
          this.spinner.hide()
          this.goBack()
        }
      },error => {
        this.toaster.error(error.error.message)
      })
    }
  }
  goBack(): void {

    this.location.back();
  }



}
