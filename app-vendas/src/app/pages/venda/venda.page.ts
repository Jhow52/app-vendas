import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { VendaService } from '../../services/venda.service';
import { ProdutoService } from '../../services/produto.service';
import { ClienteService } from '../../services/cliente.service';
import { Venda, ItemVenda } from '../../models/venda.model';
import { Produto } from '../../models/produto.model';
import { Cliente } from '../../models/cliente.model';

@Component({ selector: 'app-venda', templateUrl: './venda.page.html', styleUrls: ['./venda.page.scss'] })
export class VendaPage implements OnInit {
  vendas: Venda[] = [];
  clientes: Cliente[] = [];
  produtos: Produto[] = [];
  mostrarForm = false;
  clienteSelecionadoId: number = 0;
  itens: ItemVenda[] = [];
  produtoSelecionadoId: number = 0;
  quantidadeItem: number = 1;

  constructor(
    private vendaService: VendaService,
    private produtoService: ProdutoService,
    private clienteService: ClienteService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.carregar();
    this.clientes = this.clienteService.getAll();
    this.produtos = this.produtoService.getAll();
  }

  carregar() { this.vendas = this.vendaService.getAll(); }

  abrirForm() {
    this.clienteSelecionadoId = 0; this.itens = [];
    this.produtoSelecionadoId = 0; this.quantidadeItem = 1;
    this.mostrarForm = true;
  }

  fecharForm() { this.mostrarForm = false; }

  adicionarItem() {
    const produto = this.produtos.find(p => p.id === Number(this.produtoSelecionadoId));
    if (!produto) return;
    const qtd = Number(this.quantidadeItem);
    if (qtd <= 0 || qtd > produto.estoque) {
      this.alertCtrl.create({ header: 'Atenção', message: qtd <= 0 ? 'Quantidade inválida.' : 'Estoque insuficiente.', buttons: ['OK'] }).then(a => a.present());
      return;
    }
    const existente = this.itens.find(i => i.produtoId === produto.id);
    if (existente) { existente.quantidade += qtd; existente.subtotal = existente.quantidade * existente.precoUnitario; }
    else { this.itens.push({ produtoId: produto.id!, nomeProduto: produto.nome, quantidade: qtd, precoUnitario: produto.preco, subtotal: qtd * produto.preco }); }
    this.produtoSelecionadoId = 0; this.quantidadeItem = 1;
  }

  removerItem(idx: number) { this.itens.splice(idx, 1); }

  get totalVenda(): number { return this.itens.reduce((acc, i) => acc + i.subtotal, 0); }

  async finalizar() {
    if (!this.clienteSelecionadoId || this.itens.length === 0) {
      (await this.alertCtrl.create({ header: 'Atenção', message: 'Selecione um cliente e adicione itens.', buttons: ['OK'] })).present(); return;
    }
    const cliente = this.clientes.find(c => c.id === Number(this.clienteSelecionadoId));
    const venda: Venda = { clienteId: Number(this.clienteSelecionadoId), nomeCliente: cliente?.nome || '', itens: this.itens, total: this.totalVenda, status: 'pendente', dataCriacao: new Date().toISOString() };
    this.itens.forEach(item => this.produtoService.atualizarEstoque(item.produtoId, item.quantidade));
    this.vendaService.save(venda);
    this.carregar(); this.fecharForm();
    (await this.alertCtrl.create({ header: 'Sucesso', message: `Venda registrada! Total: R$ ${this.totalVenda.toFixed(2)}`, buttons: ['OK'] })).present();
  }

  async cancelarVenda(id: number) {
    const a = await this.alertCtrl.create({ header: 'Confirmar', message: 'Cancelar esta venda?',
      buttons: [{ text: 'Não', role: 'cancel' }, { text: 'Sim', handler: () => { this.vendaService.cancelar(id); this.carregar(); } }] });
    await a.present();
  }

  statusCor(status: string): string {
    const cores: any = { pendente: 'warning', pago: 'success', cancelado: 'danger' };
    return cores[status] || 'medium';
  }
}
