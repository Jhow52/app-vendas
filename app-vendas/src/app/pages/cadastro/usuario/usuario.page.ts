import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({ selector: 'app-usuario', templateUrl: './usuario.page.html', styleUrls: ['./usuario.page.scss'] })
export class UsuarioPage implements OnInit {
  usuarios: Usuario[] = [];
  formulario: Usuario = this.novo();
  modoEdicao = false; mostrarForm = false;

  constructor(private service: UsuarioService, private alertCtrl: AlertController) {}
  ngOnInit() { this.carregar(); }
  novo(): Usuario { return { nome: '', email: '', senha: '', perfil: 'vendedor' }; }
  carregar() { this.usuarios = this.service.getAll(); }
  abrirForm(u?: Usuario) { this.formulario = u ? { ...u } : this.novo(); this.modoEdicao = !!u; this.mostrarForm = true; }
  fecharForm() { this.mostrarForm = false; }
  async salvar() {
    if (!this.formulario.nome || !this.formulario.email || !this.formulario.senha) {
      (await this.alertCtrl.create({ header: 'Atenção', message: 'Preencha todos os campos.', buttons: ['OK'] })).present(); return;
    }
    this.service.save(this.formulario); this.carregar(); this.fecharForm();
  }
  async excluir(id: number) {
    const a = await this.alertCtrl.create({ header: 'Confirmar', message: 'Excluir usuário?',
      buttons: [{ text: 'Cancelar', role: 'cancel' }, { text: 'Excluir', handler: () => { this.service.delete(id); this.carregar(); } }] });
    await a.present();
  }
}
