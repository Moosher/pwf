import { Usuario } from 'src/app/auth/entities/usuario';
import {Produto} from 'src/app/produtos/entities/produto';

export class Pedido {
    id: number;
    produto: Produto;
    usuario: Usuario;
    dataPedido: string;
    valorTotal: number;
    quantidadeSolicitada: number;
}