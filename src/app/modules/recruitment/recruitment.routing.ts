import { AccountComponent } from './page/account/account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationComponent } from './page/application/application.component';
import { ConfigurationComponent } from './page/configuration/configuration.component';
import { HomeComponent } from './page/home/home.component';
import { JobDetailComponent } from './page/job-detail/job-detail.component';
import { JobComponent } from './page/job/job.component';
import { RecruitmentComponent } from './recruitment.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    
    component: RecruitmentComponent,
    children: [
      {
        path: 'jobs',
        component: JobComponent,
        data: { title: 'Job', breadcrumb: 'Job' }
      },
      // {
      //   path: 'jobs/:idcategory/:idEmpresa',
      //   component: JobComponent,
      //   data: { title: 'Job', breadcrumb: 'Job' }
      // },
      {
        path: 'job-detail',
        component: JobDetailComponent,
        data: { title: 'Job', breadcrumb: 'Job' }
      },
      {
        path: 'home',
        component: HomeComponent,
        data: { title: 'Home', breadcrumb: 'Home' }
      },
      {
        canActivate: [AuthGuard],
        path: 'account',
        component: ConfigurationComponent,
        data: { title: 'Configuracion', breadcrumb: 'Configuracion' }
      },
      {
        canActivate: [AuthGuard],
        path: 'application',
        component: ApplicationComponent,
        data: { title: 'Mis Postulaciones', breadcrumb: 'Mis Postulaciones' }
      },
      {
        canActivate: [AuthGuard],
        path: 'configuration',
        component: AccountComponent,
        data: { title: 'Configuracion', breadcrumb: 'Configuracion' }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruitmentRoutingModule { }