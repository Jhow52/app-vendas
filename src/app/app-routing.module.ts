import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'cadastro/usuario',
    loadChildren: () => import('./cadastro/usuario/usuario.module').then(m => m.UsuarioPageModule)
  },
  {
    path: 'cadastro/produto',
    loadChildren: () => import('./cadastro/produto/produto.module').then(m => m.ProdutoPageModule)
  },
  {
    path: 'cadastro/cliente',
    loadChildren: () => import('./cadastro/cliente/cliente.module').then(m => m.ClientePageModule)
  },
  {
    path: 'venda',
    loadChildren: () => import('./venda/venda.module').then(m => m.VendaPageModule)
  },
  {
    path: 'receber',
    loadChildren: () => import('./receber/receber.module').then(m => m.ReceberPageModule)
  },
  {
    path: 'relatorios',
    loadChildren: () => import('./relatorios/relatorios.module').then(m => m.RelatoriosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}