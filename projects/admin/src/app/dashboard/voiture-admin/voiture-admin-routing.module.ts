import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVoitureComponent } from './components/list-voiture/list-voiture.component';
import { AddVoitureComponent } from './components/add-voiture/add-voiture.component';

const routes: Routes = [
  {path:'',component:ListVoitureComponent},
  {path:'add',component:AddVoitureComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoitureAdminRoutingModule { }
