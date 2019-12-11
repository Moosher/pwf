import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSnackBar, MatDialog, MatSort } from '@angular/material';
import { APIService } from '../services/api.service';
import { Pedido } from './entities/pedido';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'data', 'produto', 'quantidade', 'valor'];
  dataSource: MatTableDataSource<Relatorio>;
  enviando: boolean;
  valorTotal: number = 0 ;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(
    private dialog: MatDialog,
    private apiService: APIService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.buscarPedidos();
  }

  buscarPedidos(){
    this.enviando = true;
    this.apiService.listarPedidos().subscribe(
      res => {
        this.dataSource = new MatTableDataSource<Relatorio>(res.map(item => new Relatorio(item)));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        res.map(item => this.valorTotal += item.valorTotal);
      }, err => {
        this.enviando = false;
        this.openSnackBar( this.apiService.errorControl(err.status))
      }, () => {
        this.enviando = false;
      }
    );
  }

  getData(dateString: string){
    return new Date(dateString);
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, null, {
      duration: 3000,
      panelClass: ['dangerSnack'],
      verticalPosition: 'top'
    });
  }

}

export class Relatorio{
  usuario: string;
  data: string;
  produto: string;
  quantidade: number;
  valor: number;
  constructor(pedido: Pedido){
    this.usuario = pedido.usuario.login;
    this.data = pedido.dataPedido;
    this.produto = pedido.produto.nome;
    this.quantidade = pedido.quantidadeSolicitada;
    this.valor = pedido.valorTotal;
  }
}