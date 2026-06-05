import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ReceberService } from '../../services/receber.service';
import { Receber } from '../../models/receber.model';

@Component({ selector: 'app-receber', templateUrl: './receber.page.html', styleUrls: ['./receber.page.scss'] })
export class ReceberPage implements OnInit {
  contas: Receber[] = [];
  constructor(private service: ReceberService, private alertCtrl: AlertController) {}
  ngOnInit() { this.carregar(); }
  carregar() { this.contas = this.service.getAll(); }
  get totalPendente(): number { return this.service.getTotalPendente(); }
  get totalRecebido(): number { return this.service.getTotalRecebido(); }
  async receberPagamento(id: number) {
    const a = await this.alertCtrl.create({ header: 'Confirmar', message: 'Confirmar recebimento?',
      buttons: [{ text: 'Cancelar', role: 'cancel' }, { text: 'Confirmar', handler: () => { this.service.receber(id); this.carregar(); } }] });
    await a.present();
  }
  statusCor(status: string): string {
    const cores: any = { pendente: 'warning', pago: 'success', vencido: 'danger' };
    return cores[status] || 'medium';
  }
}
