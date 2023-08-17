import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageDeclarationRoutingModule } from './manage-declaration-routing.module';
import { AddDeclarationAmendesComponent } from './components/add-declaration-amendes/add-declaration-amendes.component';
import { ListDeclarationsComponent } from './components/list-declarations/list-declarations.component';
import { AddDeclarationAccidentComponent } from './components/add-declaration-accident/add-declaration-accident.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from '../../material/material.module';
import { DomSanitizer } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AddDeclarationAmendesComponent,
    ListDeclarationsComponent,
    AddDeclarationAccidentComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatPaginatorModule,
    ManageDeclarationRoutingModule
  ]
})
export class ManageDeclarationModule { }
