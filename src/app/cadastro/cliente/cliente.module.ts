import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClientePage } from './cliente.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ClienteRoutingModule],
  declarations: [ClientePage]
})
export class ClientePageModule {}