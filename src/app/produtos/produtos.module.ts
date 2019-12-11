import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosComponent } from './produtos.component';
import { ProdutosRoutingModule } from './produtos-routing.module';
import { DependenciesModule } from '../dependencies/dependencies.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogSolicitarProdutosComponent } from './dialog-solicitar-produtos/dialog-solicitar-produtos.component';
import { DialogQuantidadeComponent } from './dialog-quantidade/dialog-quantidade.component';
import { DialogImgComponent } from './dialog-img/dialog-img.component';



@NgModule({
  declarations: [
    ProdutosComponent,
    DialogSolicitarProdutosComponent,
    DialogQuantidadeComponent,
    DialogImgComponent,
  ],
  entryComponents: [
    DialogSolicitarProdutosComponent, 
    DialogQuantidadeComponent,
    DialogImgComponent
  ],
  imports: [
    CommonModule,
    DependenciesModule,
    FormsModule,
    ReactiveFormsModule,
    ProdutosRoutingModule
  ]

})
export class ProdutosModule { }
