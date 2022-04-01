import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZonaPage } from './zona.page';

const routes: Routes = [
  {
    path: '',
    component: ZonaPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'cuentas',
        loadChildren: () => import('./cuentas/cuentas.module').then( m => m.CuentasPageModule)
      },
      {
        path: 'nuevo',
        loadChildren: () => import('./nuevo/nuevo.module').then( m => m.NuevoPageModule)
      },
      {
        path: 'categorias',
        loadChildren: () => import('./categorias/categorias.module').then( m => m.CategoriasPageModule)
      },
      {
        path: 'ajustes',
        loadChildren: () => import('./ajustes/ajustes.module').then( m => m.AjustesPageModule)
      },
      {
        path: '',
        redirectTo: '/z/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/z/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZonaPageRoutingModule {}
