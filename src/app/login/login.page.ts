import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Usuario {
  login: string;
  senha: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  usuario = {
    login: '',
    senha: null,
  }

  usuariosCadastrados: Usuario[] = [];

  constructor(private router: Router) {}

  avancar() {
    const login = this.usuario.login.trim();
    const senha = this.usuario.senha;

    if (!login || senha == null) {
      return;
    }
    this.router.navigate(['/menu']);
  }

  limparCampo() {
    this.usuario = {
      login: '',
      senha: null,
    };
  }

  ngOnInit() {}
}