import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-new-category-modal',
  templateUrl: './new-category-modal.page.html',
  styleUrls: ['./new-category-modal.page.scss'],
})
export class NewCategoryModalPage implements OnInit {

  @Input() userData: User;
  @Input() update: boolean;
  @Input() category: Category;


  formCategory: FormGroup;

  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private utilSV: UtilService,
              private categorySV: CategoryService,
              private formBuilder: FormBuilder) { 
    this.buildFormEmpty();
  }

  ngOnInit() {
    if (this.update) {
      this.buildFormUpdate();
    }
  }

  close() {
    if(this.formCategory.pristine) {
      this.modalCtrl.dismiss({resp: false});
    } else {
      this.closeAction();
    }
  }

  private async closeAction() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmación!',
      subHeader: 'Perderá todos los cambios.',
      message: '¿Desea continuar?',
      buttons: [
        {
          text: 'Aceptar',
          id: 'confirm-button',
          handler: () => {
            this.modalCtrl.dismiss({resp: false});
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
    

  async save() {
    const loading = await this.utilSV.getLoading();
    await loading.present();
    setTimeout(async () => {
      await this.saveAction();
      loading.dismiss();
    }, 500);
  }

  private async saveAction() {
    try {
      const newCategory: Category = this.formCategory.value;      
      if (await this.categorySV.createCategory(newCategory)){
        this.utilSV.presentToast('success', '¡Se creo la categoría con éxito!').then(() => {
          this.modalCtrl.dismiss({resp: true});
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  async updateAction() {
    const loading = await this.utilSV.getLoading();
    await loading.present();
    setTimeout(async () => {
      await this.updateCatAction();
      loading.dismiss();
    }, 500);
  }

  private async updateCatAction() {
    try {
      const newCategory: Category = this.formCategory.value;      
      if (await this.categorySV.updateCategory(newCategory, this.category.id)){
        this.utilSV.presentToast('success', '¡Se actualizo la categoría con éxito!').then(() => {
          this.modalCtrl.dismiss({resp: true});
        });
        
      }
    } catch (err) {
      console.error(err);
    }
  }

  private buildFormEmpty() {
    this.formCategory = this.formBuilder.group({
      name: [ '' , [Validators.required, Validators.minLength(3)] ],
      description: [ '' , [] ],
      icon: [ '' , [Validators.required] ],
      color: [ '' , [Validators.required] ]
    });
  }

  private buildFormUpdate() {
    this.formCategory = this.formBuilder.group({
      name: [ this.category.name , [Validators.required, Validators.minLength(3)] ],
      description: [ (this.category.description? this.category.description : '') , [] ],
      icon: [ this.category.icon , [Validators.required] ],
      color: [ this.category.color , [Validators.required] ]
    });
  }

}
