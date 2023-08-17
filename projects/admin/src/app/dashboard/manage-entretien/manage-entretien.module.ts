import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageEntretienRoutingModule } from './manage-entretien-routing.module';
import { ListEntretienComponent } from './components/list-entretien/list-entretien.component';
import { AddEntretienComponent } from './components/add-entretien/add-entretien.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from '../../material/material.module';
import { EntretienDetailsComponent } from './components/entretien-details/entretien-details.component';
import { ListValidEntretienComponent } from './components/list-valid-entretien/list-valid-entretien.component';


@NgModule({
  declarations: [
    ListEntretienComponent,
    AddEntretienComponent,
    EntretienDetailsComponent,
    ListValidEntretienComponent,
    
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatPaginatorModule,
    ManageEntretienRoutingModule
  ]
})
export class ManageEntretienModule { }
