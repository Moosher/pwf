import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/produtos', pathMatch: 'full'},
  { path: 'produtos', loadChildren: './produtos/produtos.module#ProdutosModule', canActivate: [AuthGuard] },
  { path: 'relatorios', loadChildren: './relatorios/relatorios.module#RelatoriosModule', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
