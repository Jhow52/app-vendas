import { Component, OnInit } from '@angular/core';
import { VendaService } from '../../services/venda.service';
import { ReceberService } from '../../services/receber.service';
import { ClienteService } from '../../services/cliente.service';
import { ProdutoService } from '../../services/produto.service';
import { Venda } from '../../models/venda.model';

@Component({ selector: 'app-relatorios', templateUrl: './relatorios.page.html', styleUrls: ['./relatorios.page.scss'] })
export class RelatoriosPage implements OnInit {
  totalVendas = 0; totalVendasCanceladas = 0; totalRecebido = 0; totalPendente = 0;
  totalClientes = 0; totalProdutos = 0; qtdVendas = 0;
  topProdutos: { nome: string; quantidade: number }[] = [];
  ultimasVendas: Venda[] = [];

  constructor(
    private vendaService: VendaService, private receberService: ReceberService,
    private clienteService: ClienteService, private produtoService: ProdutoService
  ) {}

  ngOnInit() { this.calcular(); }

  calcular() {
    const vendas = this.vendaService.getAll();
    const ativas = vendas.filter(v => v.status !== 'cancelado');
    this.qtdVendas = ativas.length;
    this.totalVendas = ativas.reduce((a, v) => a + v.total, 0);
    this.totalVendasCanceladas = vendas.filter(v => v.status === 'cancelado').length;
    this.totalRecebido = this.receberService.getTotalRecebido();
    this.totalPendente = this.receberService.getTotalPendente();
    this.totalClientes = this.clienteService.getAll().length;
    this.totalProdutos = this.produtoService.getAll().length;
    this.ultimasVendas = [...vendas].reverse().slice(0, 5);
    const mapa: { [key: string]: { nome: string; quantidade: number } } = {};
    ativas.forEach(v => v.itens.forEach(item => {
      if (!mapa[item.nomeProduto]) mapa[item.nomeProduto] = { nome: item.nomeProduto, quantidade: 0 };
      mapa[item.nomeProduto].quantidade += item.quantidade;
    }));
    this.topProdutos = Object.values(mapa).sort((a, b) => b.quantidade - a.quantidade).slice(0, 5);
  }

  statusCor(status: string): string {
    const cores: any = { pendente: 'warning', pago: 'success', cancelado: 'danger' };
    return cores[status] || 'medium';
  }
}
