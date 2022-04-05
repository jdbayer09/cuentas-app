import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';
import { UtilService } from './util.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private navCtrl: NavController, 
              private utilSV: UtilService,
              private http: HttpClient) { }

/*
  put(url: string, data:any): Promise<any>{
    return this.putNav(url, data);
  }

  post(url: string, data:any): Promise<any>{
    return this.postNav(url, data);
  }
*/

  get(url: string): Promise<any>{
    return new Promise(async (resolve, reject) => {
      try {
        const headers = await this.getHeaders();
        this.http.get(`${environment.server_url}${url}`, {headers}).subscribe((resp) => {
          if(resp) {
            resolve(resp);
          } else {
            reject(null);
          }
        }, err=>{
          this.httpErrorManager(err);
          reject(err);
        });
      } catch (ex) {
        this.httpErrorManager(ex);
      }
    });
  }

  delete(url: string): Promise<any>{
    return new Promise(async (resolve, reject) => {
      try {
        const headers = await this.getHeaders();
        this.http.delete(`${environment.server_url}${url}`, {headers}).subscribe((resp) => {
          if(resp) {
            resolve(resp);
          } else {
            reject(null);
          }
        }, err=>{
          this.httpErrorManager(err);
          reject(err);
        });
      } catch (ex) {
        this.httpErrorManager(ex);
      }
    });
  }

  post(url:string, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = await this.getHeaders();
        this.http.post(`${environment.server_url}${url}`, data, {headers}).subscribe((resp) => {
          if(resp) {
            resolve(resp);
          } else {
            reject(null);
          }
        }, err=>{
          this.httpErrorManager(err);
          reject(err);
        });
      } catch (ex) {
        this.httpErrorManager(ex);
      }
    });
  }

  put(url:string, data: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = await this.getHeaders();
        this.http.put(`${environment.server_url}${url}`, data, {headers}).subscribe((resp) => {
          if(resp) {
            resolve(resp);
          } else {
            reject(null);
          }
        }, err=>{
          this.httpErrorManager(err);
          reject(err);
        });
      } catch (ex) {
        this.httpErrorManager(ex);
      }
    });
  }

  register(data: User): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        this.http.post(`${environment.server_url}user/register`, data).subscribe((resp) => {
          if(resp) {
            resolve(resp);
          } else {
            reject(null);
          }
        }, err=>{
          this.httpErrorManager(err);
          reject(err);
        });
      } catch (ex) {
        this.httpErrorManager(ex);
      }
    });
  }

  private async httpErrorManager(error: any) {
    if (!environment.production) console.error("Error ->",error);
    let msg = "";
    if (error.status === 0) {
      msg = "Conection lost";
    } else {
      if (error.error.message) {
        msg =  error.error.message;
      } else if (error.error.msg) {
        msg = error.error.msg;
      } else {
        if (error.status === 403){
          localStorage.clear();
          this.navCtrl.navigateRoot('/login', {animated: true});
          msg = 'La sesión ha finalizado!';          
        } else {
          msg = 'Error interno, contactarse con soporte.';
        }
      }
    }
    this.utilSV.presentAlert('Error!', msg);
  }

  private async getHeaders() {
    let token = '';
    try {
      token = await this.getToken();
    } catch(err) {
      this.navCtrl.navigateRoot('/login', {animated: true});
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
  }

  private async getToken() {
    const token = localStorage.getItem(environment.storage_keys.token);
    if (!token) {
      localStorage.clear();
      throw  "La sesión no es valida";
    }
    return token;
  }
}
