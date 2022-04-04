import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  loading: boolean = true;

  userData: User = JSON.parse(localStorage.getItem(environment.storage_keys.user_data));

  items: Category[] = [];

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2500);
  }

}
