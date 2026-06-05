import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
  standalone: false,
})
export class ClientePage implements OnInit {

  cliente: Cliente = {
    id: 0,
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
  };

  clientes: Cliente[] = [];
  modoEdicao: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    const dados = localStorage.getItem('clientes');
    this.clientes = dados ? JSON.parse(dados) : [];
  }

  salvar() {
    if (!this.cliente.nome || !this.cliente.cpf || !this.cliente.telefone) {
      return;
    }

    if (this.modoEdicao) {
      const index = this.clientes.findIndex(c => c.id === this.cliente.id);
      if (index !== -1) {
        this.clientes[index] = { ...this.cliente };
      }
      this.modoEdicao = false;
    } else {
      this.cliente.id = Date.now();
      this.clientes.push({ ...this.cliente });
    }

    localStorage.setItem('clientes', JSON.stringify(this.clientes));
    this.limpar();
  }

  editar(c: Cliente) {
    this.cliente = { ...c };
    this.modoEdicao = true;
  }

  excluir(id: number) {
    this.clientes = this.clientes.filter(c => c.id !== id);
    localStorage.setItem('clientes', JSON.stringify(this.clientes));
  }

  limpar() {
    this.cliente = { id: 0, nome: '', cpf: '', email: '', telefone: '' };
    this.modoEdicao = false;
  }

  voltar() {
    this.router.navigate(['/menu']);
  }
}