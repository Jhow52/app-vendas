import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({ selector: 'app-login', templateUrl: './login.page.html', styleUrls: ['./login.page.scss'] })
export class LoginPage {
  email = ''; senha = '';
  constructor(private auth: AuthService, private router: Router, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}
  async entrar() {
    if (!this.email || !this.senha) { (await this.alertCtrl.create({ header: 'Atenção', message: 'Preencha e-mail e senha.', buttons: ['OK'] })).present(); return; }
    const loading = await this.loadingCtrl.create({ message: 'Entrando...' });
    await loading.present();
    setTimeout(async () => {
      const ok = this.auth.login(this.email, this.senha);
      await loading.dismiss();
      if (ok) this.router.navigateByUrl('/home', { replaceUrl: true });
      else (await this.alertCtrl.create({ header: 'Erro', message: 'E-mail ou senha inválidos.', buttons: ['OK'] })).present();
    }, 800);
  }
}
