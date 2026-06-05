import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ProdutoService } from '../../../services/produto.service';
import { Produto } from '../../../models/produto.model';

@Component({ selector: 'app-produto', templateUrl: './produto.page.html', styleUrls: ['./produto.page.scss'] })
export class ProdutoPage implements OnInit {
  produtos: Produto[] = [];
  formulario: Produto = this.novo();
  modoEdicao = false; mostrarForm = false;

  constructor(private service: ProdutoService, private alertCtrl: AlertController) {}
  ngOnInit() { this.carregar(); }
  novo(): Produto { return { nome: '', descricao: '', preco: 0, estoque: 0 }; }
  carregar() { this.produtos = this.service.getAll(); }
  abrirForm(p?: Produto) { this.formulario = p ? { ...p } : this.novo(); this.modoEdicao = !!p; this.mostrarForm = true; }
  fecharForm() { this.mostrarForm = false; }
  async salvar() {
    if (!this.formulario.nome || this.formulario.preco <= 0) {
      (await this.alertCtrl.create({ header: 'Atenção', message: 'Preencha nome e preço.', buttons: ['OK'] })).present(); return;
    }
    this.service.save(this.formulario); this.carregar(); this.fecharForm();
  }
  async excluir(id: number) {
    const a = await this.alertCtrl.create({ header: 'Confirmar', message: 'Excluir produto?',
      buttons: [{ text: 'Cancelar', role: 'cancel' }, { text: 'Excluir', handler: () => { this.service.delete(id); this.carregar(); } }] });
    await a.present();
  }
}
