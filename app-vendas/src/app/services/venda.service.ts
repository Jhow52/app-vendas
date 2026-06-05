import { Injectable } from '@angular/core';
import { Venda } from '../models/venda.model';
import { ReceberService } from './receber.service';

@Injectable({ providedIn: 'root' })
export class VendaService {
  private readonly KEY = 'vendas';
  constructor(private receberService: ReceberService) {}
  getAll(): Venda[] { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); }
  save(venda: Venda): Venda {
    const lista = this.getAll();
    venda.id = Date.now();
    venda.dataCriacao = new Date().toISOString();
    lista.push(venda);
    localStorage.setItem(this.KEY, JSON.stringify(lista));
    this.receberService.gerarDeVenda(venda);
    return venda;
  }
  cancelar(id: number): void {
    const lista = this.getAll();
    const i = lista.findIndex(v => v.id === id);
    if (i !== -1) { lista[i].status = 'cancelado'; localStorage.setItem(this.KEY, JSON.stringify(lista)); }
  }
}
