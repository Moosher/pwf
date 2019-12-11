import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Produto } from '../entities/produto';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog-solicitar-produtos',
  templateUrl: './dialog-solicitar-produtos.component.html',
  styleUrls: ['./dialog-solicitar-produtos.component.scss']
})
export class DialogSolicitarProdutosComponent implements OnInit {

  valorTotal: number = 0;
  enviando: boolean;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Produto[],
    private apiService: APIService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.data.map(item => this.valorTotal += item.valor * item.quantidadeSolicitada);
  }

  enviarSolicitacao(){
    this.enviando = true;
    this.apiService.enviarPedido(this.data).subscribe(
      res => {
        this.dialogRef.close(true)
        this.enviando = false;
      }, err => {
        this.enviando = false;
        this.openSnackBar( this.apiService.errorControl(err.status))
      }
    );
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, null, {
      duration: 3000,
      panelClass: ['dangerSnack'],
      verticalPosition: 'top'
    });
  }

}
