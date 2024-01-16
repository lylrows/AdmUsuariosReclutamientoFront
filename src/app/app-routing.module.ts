import { AuthModule } from './views/auth/auth.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { CandidatesDetailsComponent } from './components/pages/candidates-details/candidates-details.component';
import { CandidatesComponent } from './components/pages/candidates/candidates.component';
import { ComingSoonComponent } from './components/pages/coming-soon/coming-soon.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { EmployersDetailsComponent } from './components/pages/employers-details/employers-details.component';
import { EmployersComponent } from './components/pages/employers/employers.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { FavouriteJobsComponent } from './components/pages/favourite-jobs/favourite-jobs.component';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { HomeThreeComponent } from './components/pages/home-three/home-three.component';
import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { JobDetailsComponent } from './components/pages/job-details/job-details.component';
import { JobsComponent } from './components/pages/jobs/jobs.component';
import { PostAJobComponent } from './components/pages/post-a-job/post-a-job.component';
import { PricingComponent } from './components/pages/pricing/pricing.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ResumeDetailsComponent } from './components/pages/resume-details/resume-details.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { TestimonialsComponent } from './components/pages/testimonials/testimonials.component';

const routes: Routes = [
    {
        path: 'auth', 
        loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule),
        data: { title: 'Login'}
    },
    {path: '', component: HomeOneComponent},
    {path: 'home-two', component: HomeTwoComponent},
    {path: 'home-three', component: HomeThreeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'employers', component: EmployersComponent},
    {path: 'employer-details', component: EmployersDetailsComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'single-resume', component: ResumeDetailsComponent},
    {path: 'testimonials', component: TestimonialsComponent},
    {path: 'pricing', component: PricingComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'coming-soon', component: ComingSoonComponent},
    {path: 'error', component: ErrorComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'terms-conditions', component: TermsConditionsComponent},
    {path: 'about', component: AboutComponent},
    {path: 'jobs', component: JobsComponent},
    {path: 'favourite-jobs', component: FavouriteJobsComponent},
    {path: 'job-details', component: JobDetailsComponent},
    {path: 'post-a-job', component: PostAJobComponent},
    {path: 'candidates', component: CandidatesComponent},
    {path: 'candidate-details', component: CandidatesDetailsComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'blog-details', component: BlogDetailsComponent},
    {path: 'contact', component: ContactComponent},


    {path: '**', component: ErrorComponent} // This line will remain down from the whole component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}