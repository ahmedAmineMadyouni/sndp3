import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatistiquesRoutingModule } from './statistiques-routing.module';
import { StatsComponent } from './components/stats/stats.component';


@NgModule({
  declarations: [
    StatsComponent
  ],
  imports: [
    CommonModule,
    StatistiquesRoutingModule
  ]
})
export class StatistiquesModule { }
