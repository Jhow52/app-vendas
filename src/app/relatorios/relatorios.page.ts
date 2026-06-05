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
  selector: 'app-relatorios',
  templateUrl: './relatorios.page.html',
  styleUrls: ['./relatorios.page.scss'],
  standalone: false,
})
export class RelatoriosPage implements OnInit {

  vendas: Venda[] = [
    {
      id: 1,
      cliente: { nome: 'João Silva' },
      itens: [
        { produto: { nome: 'Produto A', preco: 10.00 }, quantidade: 2, subtotal: 20.00 }
      ],
      total: 20.00,
      data: '01/06/2025',
      status: 'recebido',
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
    {
      id: 3,
      cliente: { nome: 'João Silva' },
      itens: [
        { produto: { nome: 'Produto C', preco: 5.99 }, quantidade: 3, subtotal: 17.97 }
      ],
      total: 17.97,
      data: '03/06/2025',
      status: 'recebido',
    },
  ];

  get totalGeral(): number {
    return this.vendas.reduce((acc, v) => acc + v.total, 0);
  }

  get totalRecebido(): number {
    return this.vendas
      .filter(v => v.status === 'recebido')
      .reduce((acc, v) => acc + v.total, 0);
  }

  get totalPendente(): number {
    return this.vendas
      .filter(v => v.status === 'pendente')
      .reduce((acc, v) => acc + v.total, 0);
  }

  get totalVendas(): number {
    return this.vendas.length;
  }

  get vendasRecebidas(): number {
    return this.vendas.filter(v => v.status === 'recebido').length;
  }

  get vendasPendentes(): number {
    return this.vendas.filter(v => v.status === 'pendente').length;
  }

  get vendasPorCliente(): { nome: string; total: number; quantidade: number }[] {
    const mapa: { [key: string]: { total: number; quantidade: number } } = {};

    this.vendas.forEach(v => {
      const nome = v.cliente.nome;
      if (!mapa[nome]) {
        mapa[nome] = { total: 0, quantidade: 0 };
      }
      mapa[nome].total += v.total;
      mapa[nome].quantidade += 1;
    });

    return Object.keys(mapa).map(nome => ({
      nome,
      total: mapa[nome].total,
      quantidade: mapa[nome].quantidade,
    }));
  }

  get produtosMaisVendidos(): { nome: string; quantidade: number; total: number }[] {
    const mapa: { [key: string]: { quantidade: number; total: number } } = {};

    this.vendas.forEach(v => {
      v.itens.forEach(item => {
        const nome = item.produto.nome;
        if (!mapa[nome]) {
          mapa[nome] = { quantidade: 0, total: 0 };
        }
        mapa[nome].quantidade += item.quantidade;
        mapa[nome].total += item.subtotal;
      });
    });

    return Object.keys(mapa)
      .map(nome => ({
        nome,
        quantidade: mapa[nome].quantidade,
        total: mapa[nome].total,
      }))
      .sort((a, b) => b.quantidade - a.quantidade);
  }

  constructor(private router: Router) {}

  ngOnInit() {}

  voltar() {
    this.router.navigate(['/menu']);
  }
}