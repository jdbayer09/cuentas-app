import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UtilService } from '../../services/util.service';
import { UserService } from '../../services/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private utilSV: UtilService,
              private navCtrl: NavController,
              private userSV: UserService) {
    this.buildForm();
  }

  ngOnInit() {
  }

  async register() {
    const loading = await this.utilSV.getLoading();
    await loading.present();
    setTimeout(() => {
      this.userSV.registerUser(this.registerForm.value).then(resp => {
        if (resp) {
          this.utilSV.presentAlert('Exito!', 'Usuario registrado con exito.');
          this.navCtrl.navigateRoot('/login', {animated: true});
          loading.dismiss();
        } else {
          loading.dismiss();
        }
      }).catch(() => loading.dismiss());
    }, 1000);
  }

  private buildForm() {
    this.registerForm = this.formBuilder.group({
      firstName: [ '' , [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      secondName: [ '' , [ Validators.minLength(3), Validators.maxLength(50)] ],
      lastName: [ '' , [Validators.required,  Validators.minLength(3), Validators.maxLength(70)] ],
      email: [ '' , [Validators.required, Validators.email] ],
      password: [ '', [ Validators.required, Validators.minLength(5) ] ]
    });
  }

}
