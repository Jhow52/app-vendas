import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface ItemVenda {
  produto: { nome: string; preco: number };
  quantidade: number;
  subtotal: number;
}

interface Venda {
  id: number;
  cliente: { nome: string };
  itens: ItemVenda[];
  total: number;
  data: string;
  status: 'pendente' | 'recebido';
}

@Component({
  selector: 'app-receber',
  templateUrl: './receber.page.html',
  styleUrls: ['./receber.page.scss'],
  standalone: false,
})
export class ReceberPage implements OnInit {

  vendas: Venda[] = [
    {
      id: 1,
      cliente: { nome: 'João Silva' },
      itens: [
        { produto: { nome: 'Produto A', preco: 10.00 }, quantidade: 2, subtotal: 20.00 }
      ],
      total: 20.00,
      data: '01/06/2025',
      status: 'pendente',
    },
    {
      id: 2,
      cliente: { nome: 'Maria Souza' },
      itens: [
        { produto: { nome: 'Produto B', preco: 25.50 }, quantidade: 1, subtotal: 25.50 }
      ],
      total: 25.50,
      data: '02/06/2025',
      status: 'pendente',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  receberVenda(venda: Venda) {
    venda.status = 'recebido';
  }

  estornarVenda(venda: Venda) {
    venda.status = 'pendente';
  }

  get totalPendente(): number {
    return this.vendas
      .filter(v => v.status === 'pendente')
      .reduce((acc, v) => acc + v.total, 0);
  }

  get totalRecebido(): number {
    return this.vendas
      .filter(v => v.status === 'recebido')
      .reduce((acc, v) => acc + v.total, 0);
  }

  voltar() {
    this.router.navigate(['/menu']);
  }
}