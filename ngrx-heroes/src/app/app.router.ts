import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule'},
  { path: 'detail/:hero', loadChildren: './detail/detail.module#DetailModule'}
];
