import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { LoginGuard } from '@core/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'confirm/anticipation/12gf9i12kasgoao1293415',
    loadChildren: () => import('./modules/confirm-anticipation/confirm-anticipation.module').then(m => m.ConfirmAnticipationModule)
  },
  {
    path: '404',
    loadChildren: () => import('./modules/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
