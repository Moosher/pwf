import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Produto } from './entities/produto';
import { DataSource } from '@angular/cdk/table';
import { DialogQuantidadeComponent } from './dialog-quantidade/dialog-quantidade.component';
import { DialogSolicitarProdutosComponent } from './dialog-solicitar-produtos/dialog-solicitar-produtos.component';
import { APIService } from '../services/api.service';
import { DialogImgComponent } from './dialog-img/dialog-img.component';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'medida', 'preco', 'quantidade', 'acao'];
  dataSource: MatTableDataSource<Produto>;
  enviando: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private apiService: APIService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.buscarProdutos();
  }

  buscarProdutos(){
    this.enviando = true;
    this.apiService.listarProdutos().subscribe(
      res => {
        res.filter(item  => item.quantidadeSolicitada == null).map(item => item.quantidadeSolicitada = 0);
        this.dataSource = new MatTableDataSource<Produto>(res);
        this.dataSource.paginator = this.paginator;
      }, err => {
        this.enviando = false;
        this.openSnackBar(`${err.message} (${err.status})`)
      }, () => {
        this.enviando = false;
      }
    );
  }

  selecionarQuantidade(produto: Produto){
      const dialogRef = this.dialog.open(DialogQuantidadeComponent, {
        width: '350px',
        data: produto
      });
  
      dialogRef.afterClosed().subscribe(result => {
        produto.quantidadeSolicitada = result ? result : 0;
      });
  }

  solicitarProdutos(){
    let solicitados = this.dataSource.data.filter(item => item.quantidadeSolicitada > 0);
    const dialogRef = this.dialog.open(DialogSolicitarProdutosComponent, {
      width: '550px',
      data: solicitados
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.buscarProdutos();
    });
    
  }
  
  LimparProdutos(){
    this.dataSource.data.map(item => item.quantidadeSolicitada = 0);
  }
  
  enableButtonSave(){
    if(!this.dataSource) return false;
    return this.dataSource.data.filter(item => item.quantidadeSolicitada > 0).length > 0;
  }

  abrirImagem(produto: Produto){
    this.dialog.open(DialogImgComponent, {
      data: produto
    });
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, null, {
      duration: 3000,
      panelClass: ['dangerSnack'],
      verticalPosition: 'top'
    });
  }
}

