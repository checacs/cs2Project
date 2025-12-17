import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./pages/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    /*El ngOnInit de categorias(ver linea) recoge el valor "type", lo saca y lo mete en "this.type" para filtrar
    el valor recogido */
    path: 'categorias/:type',
    loadComponent: () =>
      import('./pages/categorias/categorias.page').then( m => m.CategoriasPage)
  },
  {
    path: 'search-bar',
    loadComponent: () => import('./pages/search-bar/search-bar.page').then( m => m.SearchBarPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then( m => m.TabsPage),
    children: [
      {
        path: '',
        redirectTo: 'buscar',
        pathMatch: 'full',
      },
      {
        path: 'buscar',
        loadComponent: () => import('./pages/search-bar/search-bar.page').then( m => m.SearchBarPage)
      }
    ]
  },

];
