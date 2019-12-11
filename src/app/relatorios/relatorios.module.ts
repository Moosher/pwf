import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatoriosComponent } from './relatorios.component';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DependenciesModule } from '../dependencies/dependencies.module';



@NgModule({
  declarations: [RelatoriosComponent],
  imports: [
    CommonModule,
    DependenciesModule,
    FormsModule,
    ReactiveFormsModule,
    RelatoriosRoutingModule
  ]
})
export class RelatoriosModule { }
