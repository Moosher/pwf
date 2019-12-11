import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', loadChildren: './auth/auth.module#AuthModule', canActivate: [AuthGuard] },
  { path: 'produtos', loadChildren: './produtos/produtos.module#ProdutosModule', canActivate: [AuthGuard] },
  { path: 'relatorios', loadChildren: './relatorios/relatorios.module#RelatoriosModule', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
