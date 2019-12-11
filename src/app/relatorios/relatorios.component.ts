import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { APIService } from '../services/api.service';
import { Pedido } from './entities/pedido';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'data', 'produto', 'quantidade', 'valor'];
  dataSource: MatTableDataSource<Pedido>;
  enviando: boolean;
  valorTotal: number = 0 ;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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
        this.dataSource = new MatTableDataSource<Pedido>(res);
        this.dataSource.paginator = this.paginator;
        res.map(item => this.valorTotal += item.valorTotal);
      }, err => {
        this.enviando = false;
        this.openSnackBar(`${err.message} (${err.status})`)
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