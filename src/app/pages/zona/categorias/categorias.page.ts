import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  loading: boolean = true;

  userData: User = JSON.parse(localStorage.getItem(environment.storage_keys.user_data));

  items: Category[] = [];

  constructor(private categorySV: CategoryService) { }

  ngOnInit() {
    this.refreshData();
  }


  refreshData(event?: any) {
    this.items = [];
    this.loading = true;
    setTimeout(async () => {
      this.items = await this.categorySV.listCategories();
      this.loading = false;
      if (event)
        event.target.complete();
    }, 2500);
  }

}
