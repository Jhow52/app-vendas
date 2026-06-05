import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Produto {
  nome: string;
  preco: number;
}

interface Cliente {
  nome: string;
}

interface ItemVenda {
  produto: Produto;
  quantidade: number;
  subtotal: number;
}

interface Venda {
  id: number;
  cliente: Cliente;
  itens: ItemVenda[];
  total: number;
  data: string;
  status: 'pendente' | 'recebido';
}

@Component({
  selector: 'app-venda',
  templateUrl: './venda.page.html',
  styleUrls: ['./venda.page.scss'],
  standalone: false,
})
export class VendaPage implements OnInit {

  clientes: Cliente[] = [
    { nome: 'João Silva' },
    { nome: 'Maria Souza' },
  ];

  produtos: Produto[] = [
    { nome: 'Produto A', preco: 10.00 },
    { nome: 'Produto B', preco: 25.50 },
    { nome: 'Produto C', preco: 5.99 },
  ];

  vendas: Venda[] = [];

  clienteSelecionado: Cliente | null = null;
  produtoSelecionado: Produto | null = null;
  quantidadeItem: number = 1;
  itensVenda: ItemVenda[] = [];
  totalVenda: number = 0;
  proximoId: number = 1;

  constructor(private router: Router) {}

  ngOnInit() {}

  selecionarCliente(event: any) {
    const nome = event.detail.value;
    this.clienteSelecionado = this.clientes.find(c => c.nome === nome) || null;
  }

  selecionarProduto(event: any) {
    const nome = event.detail.value;
    this.produtoSelecionado = this.produtos.find(p => p.nome === nome) || null;
  }

  adicionarItem() {
    if (!this.produtoSelecionado || this.quantidadeItem <= 0) {
      return;
    }

    const item: ItemVenda = {
      produto: this.produtoSelecionado,
      quantidade: this.quantidadeItem,
      subtotal: this.produtoSelecionado.preco * this.quantidadeItem,
    };

    this.itensVenda.push(item);
    this.calcularTotal();

    this.produtoSelecionado = null;
    this.quantidadeItem = 1;
  }

  removerItem(index: number) {
    this.itensVenda.splice(index, 1);
    this.calcularTotal();
  }

  calcularTotal() {
    this.totalVenda = this.itensVenda.reduce((acc, item) => acc + item.subtotal, 0);
  }

  finalizarVenda() {
    if (!this.clienteSelecionado || this.itensVenda.length === 0) {
      return;
    }

    const novaVenda: Venda = {
      id: this.proximoId++,
      cliente: this.clienteSelecionado,
      itens: [...this.itensVenda],
      total: this.totalVenda,
      data: new Date().toLocaleDateString('pt-BR'),
      status: 'pendente',
    };

    this.vendas.push(novaVenda);
    this.limpar();
  }

  limpar() {
    this.clienteSelecionado = null;
    this.produtoSelecionado = null;
    this.quantidadeItem = 1;
    this.itensVenda = [];
    this.totalVenda = 0;
  }

  voltar() {
    this.router.navigate(['/menu']);
  }
}