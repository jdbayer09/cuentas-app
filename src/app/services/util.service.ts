import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private loadingCtrl: LoadingController,
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
}
