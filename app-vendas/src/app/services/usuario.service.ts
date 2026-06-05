import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly KEY = 'usuarios';
  constructor() {
    if (!localStorage.getItem(this.KEY)) {
      localStorage.setItem(this.KEY, JSON.stringify([
        { id: 1, nome: 'Admin', email: 'admin@admin.com', senha: '123456', perfil: 'admin' }
      ]));
    }
  }
  getAll(): Usuario[] { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); }
  save(u: Usuario): void {
    const lista = this.getAll();
    if (u.id) { const i = lista.findIndex((x: Usuario) => x.id === u.id); if (i !== -1) lista[i] = u; }
    else { u.id = Date.now(); lista.push(u); }
    localStorage.setItem(this.KEY, JSON.stringify(lista));
  }
  delete(id: number): void {
    localStorage.setItem(this.KEY, JSON.stringify(this.getAll().filter((u: Usuario) => u.id !== id)));
  }
}
