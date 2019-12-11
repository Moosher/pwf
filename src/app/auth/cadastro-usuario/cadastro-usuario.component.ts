import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { APIService } from 'src/app/services/api.service';
import { MatSnackBar, ErrorStateMatcher } from '@angular/material';
import { Endereco } from '../entities/endereco';
import { Usuario } from '../entities/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  formLogin: FormGroup;
  formDados: FormGroup;
  formEndereco: FormGroup;
  idade: number;
  passoCadastro: number = 1;
  findingCEP: boolean;
  enviando: boolean;

  constructor(
    private apiService: APIService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.formLogin = new FormGroup({
      login: new FormControl(null, Validators.required),
      senha: new FormControl(null, Validators.required),
      confirmarSenha: new FormControl(null, Validators.required)
    });
    this.formDados = new FormGroup({
      nome: new FormControl(null, Validators.required),
      dataNascimento: new FormControl(null, Validators.required),
      sexo: new FormControl(null, Validators.required)
    });
    this.formEndereco = new FormGroup({
      cep: new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
      logradouro: new FormControl(null, null),
      numero: new FormControl(null, null),
      complemento: new FormControl(null, null),
      cidade: new FormControl(null, null),
      uf: new FormControl(null, null),
    });
  }

  calcularIdade() {
    if(!this.formDados.controls.dataNascimento.value) return;
    let birthDate = new Date(this.formDados.controls.dataNascimento.value);
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let birthdayThisYear = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
    this.idade = currentYear - birthDate.getFullYear();
    if (birthdayThisYear > currentDate) {
      this.idade--;
    }
  }

  findCep() {
    if(this.formEndereco.controls.cep.value && this.formEndereco.controls.cep.errors) {
      this.openSnackBar("Informe um CEP válido");
      return;
    }
    this.findingCEP = true;
    this.apiService.consultaCEP(this.formEndereco.controls.cep.value).subscribe(
      res => {
        this.findingCEP = false;
        this.preencherEndereco(res);
      }, err => {
        this.findingCEP = false;
        this.openSnackBar(`${err.message} (${err.status})`)
      }, () => {
        this.findingCEP = false;
      }
    );
  }

  preencherEndereco(endereco: Endereco) {
    if (!endereco) return;
    this.formEndereco.get('cidade').setValue(endereco.localidade);
    this.formEndereco.get('uf').setValue(endereco.uf);
    this.formEndereco.get('logradouro').setValue(endereco.logradouro);
  }

  nextForm() {
    if (this.passoCadastro == 3) return;
    this.passoCadastro++;
  }

  previousForm() {
    if (this.passoCadastro == 1) return;
    this.passoCadastro--;
  }

  sendData() {
    let usuario: Usuario = new Usuario();
    usuario.nome = this.formDados.controls.nome.value;
    usuario.login = this.formLogin.controls.login.value;
    usuario.senha = this.formLogin.controls.senha.value;
    this.enviando = true;
    this.apiService.cadastrarUsuario(usuario).subscribe(
      res => {
        this.apiService.generateToken(usuario.login, usuario.senha);
      }, err => {
        this.enviando = false;
        this.openSnackBar(`${err.message} (${err.status})`)
      }, () => {
        this.enviando = false;
        this.router.navigate(['/produtos']);
      }
    );
  }

  validPasswords(){
    return this.formLogin.controls.senha.value == this.formLogin.controls.confirmarSenha.value;
  }

  getForm() {
    switch (this.passoCadastro) {
      case 2:
        return this.formDados;
      case 3:
        return this.formEndereco;
      default:
        return this.formLogin;
    }
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, null, {
      duration: 3000,
      panelClass: ['dangerSnack'],
      verticalPosition: 'top'
    });
  }

}