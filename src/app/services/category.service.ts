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

  private userData: User;

  constructor(private http: HttpService,
              private navCtrl: NavController) { 
    this.getUserData(); 
  }

  listCategories(): Promise<Category[]> {
    this.getUserData(); 
    return this.http.get(`categories/${this.userData.id}/list`);
  }


  createCategory(category: Category): Promise<Category> {
    this.getUserData(); 
    return this.http.post(`categories/${this.userData.id}`, category);
  }

  updateCategory(category: Category, categoryId: number): Promise<Category> {
    this.getUserData(); 
    return this.http.put(`categories/${this.userData.id}/${categoryId}`, category);
  }

  deleteCategory(categoryId: number): Promise<Category> {
    this.getUserData(); 
    return this.http.delete(`categories/${this.userData.id}/${categoryId}`);
  }

  private getUserData() {
    this.userData = JSON.parse(localStorage.getItem(environment.storage_keys.user_data));
    if (!this.userData) {
      localStorage.clear();
      this.navCtrl.navigateRoot('/login', {animated: true});
    }  
  }
}
