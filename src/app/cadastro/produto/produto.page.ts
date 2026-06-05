import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
}

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
  standalone: false,
})
export class ProdutoPage implements OnInit {

  produto: Produto = {
    id: 0,
    nome: '',
    descricao: '',
    preco: 0,
    estoque: 0,
  };

  produtos: Produto[] = [];
  modoEdicao: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    const dados = localStorage.getItem('produtos');
    this.produtos = dados ? JSON.parse(dados) : [];
  }

  salvar() {
    if (!this.produto.nome || this.produto.preco == null || this.produto.estoque == null) {
      return;
    }

    if (this.modoEdicao) {
      const index = this.produtos.findIndex(p => p.id === this.produto.id);
      if (index !== -1) {
        this.produtos[index] = { ...this.produto };
      }
      this.modoEdicao = false;
    } else {
      this.produto.id = Date.now();
      this.produtos.push({ ...this.produto });
    }

    localStorage.setItem('produtos', JSON.stringify(this.produtos));
    this.limpar();
  }

  editar(p: Produto) {
    this.produto = { ...p };
    this.modoEdicao = true;
  }

  excluir(id: number) {
    this.produtos = this.produtos.filter(p => p.id !== id);
    localStorage.setItem('produtos', JSON.stringify(this.produtos));
  }

  limpar() {
    this.produto = { id: 0, nome: '', descricao: '', preco: 0, estoque: 0};
    this.modoEdicao = false;
  }

  voltar() {
    this.router.navigate(['/menu']);
  }
}