import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AdminGuard } from '../core/guards/admin.guard';

const routes: Routes = [
  {
    path:'',component:LayoutComponent,
    canActivateChild:[AdminGuard],
    children:[
      {path:'tasks', 
      loadChildren: () => import(`./tasks-admin/tasks-admin.module`).then(m => m.TasksAdminModule)
      },
      {path:'users', 
      loadChildren: () => import('./manage-users/manage-users.module').then(m => m.ManageUsersModule)
      },
      {path:'stats',
       loadChildren: () => import(`./statistiques/statistiques.module`).then(m => m.StatistiquesModule)},
      {path:'affectation', 
      loadChildren: () => import(`./affectation-admin/affectation-admin.module`).then(m => m.AffectationAdminModule)},
      {path:'chauffeur',loadChildren: ()=>import(`./chauffeur-admin/chauffeur-admin.module`).then(m => m.ChauffeurAdminModule)},
      {path:'voiture',loadChildren: ()=>import(`./voiture-admin/voiture-admin.module`).then(m =>m.VoitureAdminModule)},
      {path:'fournisseur',loadChildren:()=>import(`./manage-fournisseur/manage-fournisseur.module`).then(m=>m.ManageFournisseurModule)},
      {path:'entretien',loadChildren:()=>import(`./manage-entretien/manage-entretien.module`).then(m=>m.ManageEntretienModule)},
      {path:'declaration',loadChildren:()=>import('./declaration-admin/declaration-admin.module').then(m=>m.DeclarationAdminModule)},
        ]
},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
