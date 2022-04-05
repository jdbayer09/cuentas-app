import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriasPageRoutingModule } from './categorias-routing.module';

import { CategoriasPage } from './categorias.page';
import { NewCategoryModalPageModule } from '../../../modals/new-category-modal/new-category-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriasPageRoutingModule,
    NewCategoryModalPageModule
  ],
  declarations: [CategoriasPage]
})
export class CategoriasPageModule {}
