import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { User } from '../models/user.model';
import { HttpService } from './http.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private userData: User = JSON.parse(localStorage.getItem(environment.storage_keys.user_data));

  constructor(private http: HttpService,
              private navCtrl: NavController) { 
    if (!this.userData) {
      localStorage.clear();
      navCtrl.navigateRoot('/login', {animated: true});
    }      
  }

  listCategories(): Promise<Category[]> {
    return this.http.get('categories/' + this.userData.id + '/list');
  }
}
