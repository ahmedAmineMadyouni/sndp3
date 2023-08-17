import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageDemandesRoutingModule } from './manage-demandes-routing.module';
import { AddDemandesEntretienComponent } from './components/add-demandes-entretien/add-demandes-entretien.component';
import { ListDemandesEntretienComponent } from './components/list-demandes-entretien/list-demandes-entretien.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from '../../material/material.module';
import { ListEntretienUserComponent } from './components/list-entretien-user/list-entretien-user.component';


@NgModule({
  declarations: [
    AddDemandesEntretienComponent,
    ListDemandesEntretienComponent,
    ListEntretienUserComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatPaginatorModule,
    ManageDemandesRoutingModule
  ]
})
export class ManageDemandesModule { }
