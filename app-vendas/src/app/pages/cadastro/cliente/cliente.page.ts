import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente.model';

@Component({ selector: 'app-cliente', templateUrl: './cliente.page.html', styleUrls: ['./cliente.page.scss'] })
export class ClientePage implements OnInit {
  clientes: Cliente[] = [];
  formulario: Cliente = this.novo();
  modoEdicao = false; mostrarForm = false;

  constructor(private service: ClienteService, private alertCtrl: AlertController) {}
  ngOnInit() { this.carregar(); }
  novo(): Cliente { return { nome: '', cpf: '', telefone: '', email: '' }; }
  carregar() { this.clientes = this.service.getAll(); }
  abrirForm(c?: Cliente) { this.formulario = c ? { ...c } : this.novo(); this.modoEdicao = !!c; this.mostrarForm = true; }
  fecharForm() { this.mostrarForm = false; }
  async salvar() {
    if (!this.formulario.nome || !this.formulario.cpf) {
      (await this.alertCtrl.create({ header: 'Atenção', message: 'Preencha nome e CPF.', buttons: ['OK'] })).present(); return;
    }
    this.service.save(this.formulario); this.carregar(); this.fecharForm();
  }
  async excluir(id: number) {
    const a = await this.alertCtrl.create({ header: 'Confirmar', message: 'Excluir cliente?',
      buttons: [{ text: 'Cancelar', role: 'cancel' }, { text: 'Excluir', handler: () => { this.service.delete(id); this.carregar(); } }] });
    await a.present();
  }
}
