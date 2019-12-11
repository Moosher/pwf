import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { DependenciesModule } from '../dependencies/dependencies.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent, CadastroUsuarioComponent, AuthComponent],
  imports: [
    CommonModule,
    DependenciesModule,
    FormsModule,
    ReactiveFormsModule,

    AuthRoutingModule
  ],
  providers: []
})
export class AuthModule { }
