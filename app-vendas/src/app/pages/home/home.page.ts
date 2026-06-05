import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';

@Component({ selector: 'app-home', templateUrl: './home.page.html', styleUrls: ['./home.page.scss'] })
export class HomePage {
  usuario: Usuario | null = null;
  menus = [
    { titulo: 'Usuários',   icone: 'people-outline',   rota: '/cadastro/usuario', cor: 'primary' },
    { titulo: 'Produtos',   icone: 'cube-outline',      rota: '/cadastro/produto', cor: 'secondary' },
    { titulo: 'Clientes',   icone: 'person-outline',    rota: '/cadastro/cliente', cor: 'tertiary' },
    { titulo: 'Venda',      icone: 'cart-outline',      rota: '/venda',            cor: 'success' },
    { titulo: 'Receber',    icone: 'cash-outline',      rota: '/receber',          cor: 'warning' },
    { titulo: 'Relatórios', icone: 'bar-chart-outline', rota: '/relatorios',       cor: 'danger' },
  ];
  constructor(private auth: AuthService, public router: Router) { this.usuario = this.auth.getUsuario(); }
  navegar(rota: string) { this.router.navigateByUrl(rota); }
  sair() { this.auth.logout(); this.router.navigateByUrl('/login', { replaceUrl: true }); }
}
