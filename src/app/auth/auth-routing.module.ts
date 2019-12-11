import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';


const routes: Routes = [
    {
        path: '', component: AuthComponent, children: [
            { path: 'login', component: LoginComponent },
            { path: 'cadastro', component: CadastroUsuarioComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
