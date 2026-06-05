import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro/usuario',
    loadChildren: () => import('./pages/cadastro/usuario/usuario.module').then(m => m.UsuarioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro/produto',
    loadChildren: () => import('./pages/cadastro/produto/produto.module').then(m => m.ProdutoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro/cliente',
    loadChildren: () => import('./pages/cadastro/cliente/cliente.module').then(m => m.ClientePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'venda',
    loadChildren: () => import('./pages/venda/venda.module').then(m => m.VendaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'receber',
    loadChildren: () => import('./pages/receber/receber.module').then(m => m.ReceberPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'relatorios',
    loadChildren: () => import('./pages/relatorios/relatorios.module').then(m => m.RelatoriosPageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
