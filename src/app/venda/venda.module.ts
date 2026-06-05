import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VendaRoutingModule } from './venda-routing.module';
import { VendaPage } from './venda.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, VendaRoutingModule],
  declarations: [VendaPage]
})
export class VendaPageModule {}