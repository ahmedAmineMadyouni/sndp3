import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { DemandeDetailsComponent } from './components/demande-details/demande-details.component';


@NgModule({
  declarations: [
    ListTasksComponent,
    TaskDetailsComponent,
    DemandeDetailsComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
