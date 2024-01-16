import { AccountComponent } from './page/account/account.component';
import { DndDirective } from './page/configuration/information-postulant/directives/dnd.directive';
import { InformationDisabilityomponent } from './page/configuration/information-disability-postulant/information-disability.component';
import { InformationJobObjectiveComponent } from './page/configuration/information-job-objective/information-job-objective.component';
import { DialogInformationPersonalComponent } from './page/configuration/information-postulant/dialog-information-personal/dialog-information-personal.component';
import { ExperienceWorkDialogComponent } from './page/configuration/information-experience-work/dialog/experience-work-dialog.component';
import { ExperienceWorkComponent } from './page/configuration/information-experience-work/experience-work.component';
import { InformationSkillsDialogComponent } from './page/configuration/information-skills/dialog/information-skills-dialog.component';
import { InformationLanguageDialogComponent } from './page/configuration/information-language/dialog/information-language-dialog.component';
import { InformationEducationDialogComponent } from './page/configuration/information-education/dialog/information-education-dialog.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { InformationSkillsComponent } from './page/configuration/information-skills/information-skills.component';
import { InformationLanguageComponent } from './page/configuration/information-language/information-language.component';
import { InformationEducationComponent } from './page/configuration/information-education/information-education.component';
import { InformationPostulantComponent } from './page/configuration/information-postulant/information-postulant.component';

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuillModule } from 'ngx-quill';
// import { SharedModule } from '@shared/shared.module';
import { RecruitmentRoutingModule } from "./recruitment.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JobComponent } from './page/job/job.component';
import { HomeComponent } from './page/home/home.component';
import { JobDetailComponent } from './page/job-detail/job-detail.component';
import { ToastModule } from "primeng/toast";
import { ConfigurationComponent } from "./page/configuration/configuration.component";
import { OtherJobsComponent } from './page/other-jobs/other-jobs.component';
import {TabViewModule} from 'primeng/tabview';
import { NewLetterComponent } from './page/home/new-letter/new-letter.component';
import { ApplicationComponent } from './page/application/application.component';
import { HeaderApplicationComponent } from './page/application/header-application/header-application.component';
import { CardRecruitmentComponent } from './page/application/card-recruitment/card-recruitment.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {ButtonModule} from 'primeng/button';
import { JobObjectiveDialogComponent } from './page/configuration/information-job-objective/dialog/job-objective-dialog.component';
import { InformationSalaryComponent } from './page/configuration/information-salary/information-salary.component';
import { SalaryPreferenceDialogComponent } from './page/configuration/information-salary/dialog/salary-preference-dialog.component';
import { DisabilityDialogComponent } from './page/configuration/information-disability-postulant/dialog/disability-dialog.component';
import { CardMoreOfertComponent } from './page/application/card-more-ofert/card-more-ofert.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { InformationContactDialogComponent } from './page/configuration/information-postulant/dialog-information-contact/information-contact-dialog.component';
import {DragDropModule} from 'primeng/dragdrop';
import { PaginationModule,PaginationConfig } from 'ngx-bootstrap/pagination';
import { RecruitmentComponent } from './recruitment.component';
import { SafeHtmlPipe } from "./safe-html.pipe";
import { InputMaskModule } from '@ngneat/input-mask';



@NgModule({
  declarations: [  
    SafeHtmlPipe,
    JobComponent,
    HomeComponent,
    JobDetailComponent,
    ConfigurationComponent,
    InformationPostulantComponent,
    InformationEducationComponent,
    InformationLanguageComponent,
    InformationSkillsComponent,
    InformationEducationDialogComponent,
    InformationLanguageDialogComponent,
    InformationSkillsDialogComponent,
    OtherJobsComponent,
    NewLetterComponent,
    ApplicationComponent,
    HeaderApplicationComponent,
    CardRecruitmentComponent,
    ExperienceWorkComponent,
    ExperienceWorkDialogComponent,
    DialogInformationPersonalComponent,
    NewLetterComponent,
    InformationJobObjectiveComponent,
    JobObjectiveDialogComponent,
    InformationSalaryComponent,
    SalaryPreferenceDialogComponent,
    InformationDisabilityomponent,
    DisabilityDialogComponent,
    CardMoreOfertComponent,
    InformationContactDialogComponent,
    DndDirective,
    AccountComponent,
    RecruitmentComponent
  ],
  imports: [
    CommonModule,
    RecruitmentRoutingModule,
    ToastModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    TabViewModule,
    AutocompleteLibModule,
    QuillModule.forRoot(),
    ButtonModule,
    //BrowserAnimationsModule,
    AccordionModule.forRoot(),
    DragDropModule,
    PaginationModule,
    InputMaskModule.forRoot({ isAsync: true }),
    //, SharedModule
  ],
  providers:[PaginationConfig]
  ,
  entryComponents : [InformationEducationDialogComponent, InformationLanguageDialogComponent, InformationSkillsDialogComponent, ExperienceWorkDialogComponent,
    DialogInformationPersonalComponent, JobObjectiveDialogComponent, SalaryPreferenceDialogComponent, DisabilityDialogComponent, InformationContactDialogComponent]
})
export class RecruitmentModule {}
