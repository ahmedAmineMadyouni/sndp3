import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { UserGuard } from '../core/guards/user.guard';

const routes: Routes = [
  {
    path:'',component:LayoutComponent,
    canActivateChild:[UserGuard],
    children:[
      {path:'tasks', 
  loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
  },
  {path:'demande',loadChildren:()=> import('./manage-demandes/manage-demandes.module').then(x => x.ManageDemandesModule)},
  {path:'declaration', 
  loadChildren: () => import('./manage-declaration/manage-declaration.module').then(m => m.ManageDeclarationModule)},
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
