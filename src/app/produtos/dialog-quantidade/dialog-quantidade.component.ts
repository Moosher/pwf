import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Produto } from '../entities/produto';

@Component({
  selector: 'app-dialog-quantidade',
  templateUrl: './dialog-quantidade.component.html',
  styleUrls: ['./dialog-quantidade.component.scss']
})
export class DialogQuantidadeComponent implements OnInit {
  qtdMax: Array<number>;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Produto
  ) { }

  ngOnInit() {
    this.qtdMax = ([...Array(this.data.quantidade).keys()].map(x => x + 1));
  }

}
