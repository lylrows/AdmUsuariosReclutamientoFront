import { SharedComponentsModule } from './../../shared/components/shared-components.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthRoutes } from './auth.routing';
import { NgModule } from '@angular/core';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { MessageService, SharedModule } from 'primeng/api';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { AccountActiveComponent } from './account-activate/account-activate.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(AuthRoutes),
        ReactiveFormsModule,
        ToastModule,
        SharedComponentsModule,
        NgxSpinnerModule
    ],
    exports: [],
    declarations: [
        LoginComponent,
        RegisterComponent,
        ChangePasswordComponent,
        ForgotPasswordComponent,
        ActivateAccountComponent,
        AccountActiveComponent
    ],
    providers: [MessageService],
})
export class AuthModule { }
