import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDeclarationsComponent } from './components/list-declarations/list-declarations.component';
import { AddDeclarationAccidentComponent } from './components/add-declaration-accident/add-declaration-accident.component';
import { AddDeclarationAmendesComponent } from './components/add-declaration-amendes/add-declaration-amendes.component';

const routes: Routes = [
  {path:'',component:ListDeclarationsComponent},
  {path:'add/acc',component:AddDeclarationAccidentComponent},
  {path:'add/ame',component:AddDeclarationAmendesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageDeclarationRoutingModule { }
