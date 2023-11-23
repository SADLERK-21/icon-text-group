import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core-services/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomeModule)
  },
  {
    path: 'login', loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/profile-page/profile-page.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'inventory',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/inventory-page/inventory.module').then(m => m.InventoryModule)
  },
  {
    path: 'billings',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./pages/billings-page/billings.module').then(m => m.BillingsModule)
  },
  {
    path: 'reports', canActivate: [AuthGuard],
    canActivateChild: [AuthGuard], loadChildren: () => import('./pages/reports-page/reports.module').then(m => m.ReportsPageModule)
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
