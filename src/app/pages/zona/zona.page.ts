import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-zona',
  templateUrl: './zona.page.html',
  styleUrls: ['./zona.page.scss'],
})
export class ZonaPage implements OnInit {

  userData: User;

  constructor(private userSV: UserService) { 
    this.loadData();
  }

  ngOnInit() {
  }


  private async loadData() {
    this.userData = await this.userSV.getUserData();
  }
}
