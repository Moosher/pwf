import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { Usuario } from '../entities/usuario';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Token } from '../entities/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  enviando: boolean;

  constructor(
    private apiService: APIService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl(null, Validators.required),
      senha: new FormControl(null, Validators.required)
    });
  }

  doLogin() {
    this.enviando = true;
    this.apiService.doLogin(this.form.value).subscribe(
      () => {
        this.apiService.generateToken(this.form.value.login,this.form.value.senha);
      }, err => {
        this.enviando = false;
        this.apiService.destroyToken();
        this.openSnackBar( this.apiService.errorControl(err.status))
      }, () => {
        this.enviando = false;
        this.router.navigate(['/produtos']);
      }
    );
  }

  limparCampos(){
    this.form.controls.login.setValue(null);
    this.form.controls.senha.setValue(null);
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, null, {
      duration: 3000,
      panelClass: ['dangerSnack'],
      verticalPosition: 'top'
    });
  }
}
