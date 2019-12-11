import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Endereco } from '../auth/entities/endereco';
import { Usuario } from '../auth/entities/usuario';
import { EventEmitter } from '@angular/core';
import { Produto } from '../produtos/entities/produto';
import { Token } from '../auth/entities/token';
import { Pedido } from '../relatorios/entities/pedido';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  token: Token;
  emmiter: EventEmitter<boolean> = new EventEmitter<boolean>();
  baseUrl = environment.portal;

  constructor(private http: HttpClient) { }

  consultaCEP(cep: string) {
    return this.http.get<Endereco>(`http://viacep.com.br/ws/${cep}/json`);
  }

  doLogin(user: Usuario) {
    return this.http.post(`${this.baseUrl}/usuario/validaLogin`, user, { headers: this.getHeaders() });
  }

  cadastrarUsuario(user: Usuario) {
    return this.http.put(`${this.baseUrl}/usuario`, user, { headers: this.getHeaders() });
  }

  listarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseUrl}/s/produto`, { headers: this.getHeaders(true) });
  }

  listarPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}/s/pedido`, { headers: this.getHeaders(true) });
  }

  enviarPedido(produtos: Produto[]) {
    return this.http.put(`${this.baseUrl}/s/pedido`, produtos, { headers: this.getHeaders(true) });
  }

  verifyCacheUser() {
    this.token = JSON.parse(localStorage.getItem("TOKEN"));
    if (this.token) {
      this.emmiter.emit(true);
    }
  }

  generateToken(login: string, senha: string) {
    this.token = new Token();
    this.token.token = window.btoa(login + ':' + senha);
    localStorage.setItem("TOKEN", JSON.stringify(this.token));
    this.emmiter.emit(true);
  }

  destroyToken() {
    this.token = null;
    localStorage.setItem("TOKEN", null);
    this.emmiter.emit(false);
  }

  getHeaders(useToken?: boolean) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    if (useToken) headers = headers.append("Authorization", `Basic ${this.token.token}`);
    return headers;
  }

}
