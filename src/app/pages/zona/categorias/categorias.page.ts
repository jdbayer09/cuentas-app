import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { NewCategoryModalPage } from '../../../modals/new-category-modal/new-category-modal.page';
import { ModalController, AlertController } from '@ionic/angular';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  loading: boolean = true;

  userData: User = JSON.parse(localStorage.getItem(environment.storage_keys.user_data));

  items: Category[] = [];

  constructor(private categorySV: CategoryService,
              private utilSV: UtilService,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData(event?: any) {
    this.items = [];
    this.loading = true;
    setTimeout(async () => {
      this.items = await this.categorySV.listCategories();
      this.loading = false;
      if (event)
        event.target.complete();
    }, 500);
  }

  async newCategory() {
    const modal = await this.modalCtrl.create({
      component: NewCategoryModalPage,
      backdropDismiss: false,
      componentProps: {userData: this.userData},
      animated: true
    });
    await modal.present();
    const { resp } = (await modal.onDidDismiss()).data;

    if (resp) {
      setTimeout(() => {
        this.refreshData();
      }, 100);
    }
  }

  async bloquearCategoria(cat: Category) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación!',
      message: '¿Desea bloquear la categoria?',
      buttons: [
        {
          text: 'Aceptar',
          id: 'confirm-button',
          handler: async () => {
            const loading = await this.utilSV.getLoading();
            await loading.present();
            setTimeout(async () => {
              await this.bloquearCategoriaAction(cat);
              loading.dismiss();
            }, 500);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button'
        }
      ]
    });

    await alert.present();
  }

  private async bloquearCategoriaAction(cat: Category) {
    try {    
      if (await this.categorySV.deleteCategory(cat.id)){
        this.utilSV.presentToast('success', '¡Se bloqueo la categoría con éxito!').then(() => {
          this.refreshData();
        });
        
      }
    } catch (err) {
      console.error(err);
    }
  }

  async editarCategoria(cat: Category) {
    const modal = await this.modalCtrl.create({
      component: NewCategoryModalPage,
      backdropDismiss: false,
      componentProps: {userData: this.userData, update: true, category: cat},
      animated: true
    });
    await modal.present();
    const { resp } = (await modal.onDidDismiss()).data;

    if (resp) {
      setTimeout(() => {
        this.refreshData();
      }, 100);
    }
  }

}
