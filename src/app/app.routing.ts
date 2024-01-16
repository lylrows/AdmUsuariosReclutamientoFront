import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
//import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const rootRouterConfig: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
   /*   {
        path: 'auth', 
        loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule),
        data: { title: 'Login'}
      },*/
      {
        path: 'recruitment',
        loadChildren: () => import('./modules/recruitment/recruitment.module').then(m => m.RecruitmentModule),
        data: { title: 'Trabaja con Nosotros', breadcrumb: 'Trabaja con Nosotros'}
      },
    ]
  },
  {
    path: 'auth', 
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule),
    data: { title: 'Login'}
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

