import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private readonly KEY = 'clientes';
  constructor() {
    if (!localStorage.getItem(this.KEY)) {
      localStorage.setItem(this.KEY, JSON.stringify([
        { id: 1, nome: 'Cliente Exemplo', cpf: '000.000.000-00', telefone: '(00) 00000-0000', email: 'cliente@email.com' }
      ]));
    }
  }
  getAll(): Cliente[] { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); }
  save(c: Cliente): void {
    const lista = this.getAll();
    if (c.id) { const i = lista.findIndex((x: Cliente) => x.id === c.id); if (i !== -1) lista[i] = c; }
    else { c.id = Date.now(); lista.push(c); }
    localStorage.setItem(this.KEY, JSON.stringify(lista));
  }
  delete(id: number): void {
    localStorage.setItem(this.KEY, JSON.stringify(this.getAll().filter((c: Cliente) => c.id !== id)));
  }
}
