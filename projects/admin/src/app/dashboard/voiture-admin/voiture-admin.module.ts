import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoitureAdminRoutingModule } from './voiture-admin-routing.module';
import { ListVoitureComponent } from './components/list-voiture/list-voiture.component';
import { AddVoitureComponent } from './components/add-voiture/add-voiture.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    ListVoitureComponent,
    AddVoitureComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatPaginatorModule,
    VoitureAdminRoutingModule
  ]
})
export class VoitureAdminModule { }
