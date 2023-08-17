import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { DemandeDetailsComponent } from './components/demande-details/demande-details.component';

const routes: Routes = [
  {
    path:'',
    component:ListTasksComponent
  },
  {
    path:':id', 
    component:TaskDetailsComponent
  },
  {path:'demande/:iddemande',component:DemandeDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
