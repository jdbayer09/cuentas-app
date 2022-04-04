import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }

  getUserData(): Promise<any | null> {
    return new Promise( (resolve, reject) => {
      this.http.get('user').then(data => {
        if (data) {
          localStorage.setItem(environment.storage_keys.user_data, JSON.stringify(data));

          resolve(data);
        } else {
          localStorage.removeItem(environment.storage_keys.user_data);
          reject(null);
        }
      }).catch(() => reject(null));
    });
  }

  registerUser(data: User) {
    return new Promise( (resolve, reject) => {
      this.http.register(data).then(data => {
        if (data) {
          resolve(data);
        } else {
          reject(null);
        }
      }).catch(() => reject(null));
    });
  }
}
