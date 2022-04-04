import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UtilService } from '../../services/util.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private utilSV: UtilService,
              private navCtrl: NavController,
              private authSV: AuthService) { 
    this.formBuild();
  }

  ngOnInit() {
  }

  private formBuild() {
    this.loginForm = this.formBuilder.group({
      login: [ '' , [Validators.required, Validators.email] ],
      password: [ '', [ Validators.required, Validators.minLength(5) ] ]
    });
  }

  async login() {
    const loading = await this.utilSV.getLoading();
    await loading.present();
    setTimeout(() => {
      this.authSV.login({email: this.loginForm.value.login, password: this.loginForm.value.password}).then(resp => {
        if (resp) {
          localStorage.setItem('token', resp.token);
          this.navCtrl.navigateRoot('/z');
          loading.dismiss();
        } else {
          localStorage.removeItem('token');
          loading.dismiss();
        }
      }).catch(() => loading.dismiss());
    }, 1000);
  }

}
