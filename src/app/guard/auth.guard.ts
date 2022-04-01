import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private navCtrl: NavController) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return true;
      let token = localStorage.getItem('token');

      if (token && token !== '' && token.length > 0) {
        return true;
      } else {
        this.navCtrl.navigateRoot('/login', {animated: true});
        return false;
      }
  }
}
