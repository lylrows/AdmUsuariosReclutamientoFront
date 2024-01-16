import { AccountActiveComponent } from './account-activate/account-activate.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';

export const AuthRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                component: LoginComponent,
                data: { title: "Login" }
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent,
                data: { title: "Forgot password" }
            },
            {
                path: 'change-password',
                component: ChangePasswordComponent,
                data: { title: "Change password" }
            },
            {
                path: 'register',
                component: RegisterComponent,
                data: { title: "Register" }
            },
            {
                path: 'active-account/:email',
                component: ActivateAccountComponent,
                data: { title: "Activar Cuenta" }
            },
            {
                path: 'account-active/:id',
                component: AccountActiveComponent,
                data: { title: "Cuenta Activada" }
            }
        ]
    }
]