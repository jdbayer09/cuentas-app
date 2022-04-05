import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) { }

  getLoading() {
    return this.loadingCtrl.create({
      message: 'Cargando...',
      animated: true,
      spinner: 'bubbles',
      cssClass: 'loadingCss'
    });
  }

  async presentAlert(tittle: string, msg: string) {
    const alert = this.alertCtrl.create({
      message: msg,
      header: tittle,
      buttons: ['Aceptar']
    });
    alert.then(alerts => alerts.present());
  }

  async presentToast(color: string, msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      animated: true,
      color: color,
      position: 'top',
      duration: 2000
    });
    return toast.present();
  }
}
