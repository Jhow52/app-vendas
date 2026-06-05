import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'usuario_logado';
  private usuarios: Usuario[] = [
    { id: 1, nome: 'Admin', email: 'admin@admin.com', senha: '123456', perfil: 'admin' }
  ];

  login(email: string, senha: string): boolean {
    const u = this.usuarios.find(u => u.email === email && u.senha === senha);
    if (u) { localStorage.setItem(this.KEY, JSON.stringify(u)); return true; }
    return false;
  }

  logout(): void { localStorage.removeItem(this.KEY); }

  isLogado(): boolean { return !!localStorage.getItem(this.KEY); }

  getUsuario(): Usuario | null {
    const d = localStorage.getItem(this.KEY);
    return d ? JSON.parse(d) : null;
  }
}
