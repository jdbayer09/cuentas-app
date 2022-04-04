import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private utilSV: UtilService) { }

  login(data: loginAcc): Promise<any> {
      return new Promise( (resolve, reject) => {
        this.http.post(`${environment.server_url}login`, data).subscribe(resp => {
          if(resp) {
            resolve(resp);
          } else {
            reject(null);
          }
        }, err => {
          console.error(err);
          if (err.status === 0) {
            this.utilSV.presentAlert('Problemas de Conexión', 'Verificar la conexión del sistema');
          } else {
            if (err.error.message) {
              this.utilSV.presentAlert('Error!', err.error.message);
            } else if (err.error.msg) {
              this.utilSV.presentAlert('Error!', err.error.msg);
            }
          }
          reject(err);
        });
      });
  }
}

interface loginAcc {
  email: string,
  password: string;
}
