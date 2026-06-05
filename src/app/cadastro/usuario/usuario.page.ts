import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Usuario {
  id: number;
  nome: string;
  login: string;
  senha: string;
  perfil: string;
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
  standalone: false,
})
export class UsuarioPage implements OnInit {

  usuario: Usuario = {
    id: 0,
    nome: '',
    login: '',
    senha: '',
    perfil: '',
  };

  usuarios: Usuario[] = [];
  modoEdicao: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    const dados = localStorage.getItem('usuarios');
    this.usuarios = dados ? JSON.parse(dados) : [];
  }

  salvar() {
    if (!this.usuario.nome || !this.usuario.login || !this.usuario.senha || !this.usuario.perfil) {
      return;
    }

    if (this.modoEdicao) {
      const index = this.usuarios.findIndex(u => u.id === this.usuario.id);
      if (index !== -1) {
        this.usuarios[index] = { ...this.usuario };
      }
      this.modoEdicao = false;
    } else {
      this.usuario.id = Date.now();
      this.usuarios.push({ ...this.usuario });
    }

    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    this.limpar();
  }

  editar(u: Usuario) {
    this.usuario = { ...u };
    this.modoEdicao = true;
  }

  excluir(id: number) {
    this.usuarios = this.usuarios.filter(u => u.id !== id);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  limpar() {
    this.usuario = { id: 0, nome: '', login: '', senha: '', perfil: '' };
    this.modoEdicao = false;
  }

  voltar() {
    this.router.navigate(['/menu']);
  }
}