import { Injectable } from '@angular/core';
import { Receber } from '../models/receber.model';
import { Venda } from '../models/venda.model';

@Injectable({ providedIn: 'root' })
export class ReceberService {
  private readonly KEY = 'receber';
  getAll(): Receber[] { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); }
  gerarDeVenda(venda: Venda): void {
    const lista = this.getAll();
    const receber: Receber = {
      id: Date.now(), vendaId: venda.id!, clienteId: venda.clienteId,
      nomeCliente: venda.nomeCliente, valor: venda.total,
      dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'pendente'
    };
    lista.push(receber);
    localStorage.setItem(this.KEY, JSON.stringify(lista));
  }
  receber(id: number): void {
    const lista = this.getAll();
    const i = lista.findIndex(r => r.id === id);
    if (i !== -1) {
      lista[i].status = 'pago';
      lista[i].dataPagamento = new Date().toISOString().split('T')[0];
      localStorage.setItem(this.KEY, JSON.stringify(lista));
    }
  }
  getTotalPendente(): number { return this.getAll().filter(r => r.status === 'pendente').reduce((a, r) => a + r.valor, 0); }
  getTotalRecebido(): number { return this.getAll().filter(r => r.status === 'pago').reduce((a, r) => a + r.valor, 0); }
}
