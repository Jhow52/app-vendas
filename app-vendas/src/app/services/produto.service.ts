import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private readonly KEY = 'produtos';
  constructor() {
    if (!localStorage.getItem(this.KEY)) {
      localStorage.setItem(this.KEY, JSON.stringify([
        { id: 1, nome: 'Produto Exemplo', descricao: 'Descrição', preco: 29.90, estoque: 100 }
      ]));
    }
  }
  getAll(): Produto[] { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); }
  save(p: Produto): void {
    const lista = this.getAll();
    if (p.id) { const i = lista.findIndex((x: Produto) => x.id === p.id); if (i !== -1) lista[i] = p; }
    else { p.id = Date.now(); lista.push(p); }
    localStorage.setItem(this.KEY, JSON.stringify(lista));
  }
  delete(id: number): void {
    localStorage.setItem(this.KEY, JSON.stringify(this.getAll().filter((p: Produto) => p.id !== id)));
  }
  atualizarEstoque(id: number, qtd: number): void {
    const lista = this.getAll();
    const i = lista.findIndex((p: Produto) => p.id === id);
    if (i !== -1) { lista[i].estoque -= qtd; localStorage.setItem(this.KEY, JSON.stringify(lista)); }
  }
}
