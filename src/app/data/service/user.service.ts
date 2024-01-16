import { User } from './../../shared/models/user.model';
import { UserResetPassword } from './../schema/user/UserResetPassword';
import { Result } from './../schema/result';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { SendRessetPasswordCode } from './../schema/user/SendRessetPasswordCode';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
    private apiController = '/User';

    constructor(private httpClient: HttpClient) {}

    add(user): Observable<Result> {
        return this.httpClient.post<Result>(`${environment.apiURL}${this.apiController}/add`, user);
    }

    sendResetPasswordCode(item: SendRessetPasswordCode): Observable<Result> {
        return this.httpClient.post<Result>(
            `${environment.apiURL}${this.apiController}/sendpasswordresetcode`,
            item
        );
    }

    resetpassword(item: UserResetPassword): Observable<boolean> {
        return this.httpClient.patch<boolean>(
            `${environment.apiURL}${this.apiController}/resetpassword`,
            item
        );
    }

    resetpasswordPatch(item: UserResetPassword): Observable<Result> {
        return this.httpClient.patch<Result>(
          `${environment.apiURL}${this.apiController}/resetpassword`,
          item
        );
      }

    getValidRessetPassword(id: number, codebase: string): Observable<Result> {
        return this.httpClient.get<Result>(
            `${environment.apiURL}${this.apiController}/validressetpassword/${id}/${codebase}`
        );
    }

    activateUser(id: number): Observable<Result> {
        return this.httpClient.get<Result>(
            `${environment.apiURL}${this.apiController}/activeaccount/${id}`
        );
    }

    sendMailActivation(email: string): Observable<Result> {
        return this.httpClient.get<Result>(
            `${environment.apiURL}${this.apiController}/sendmailactivation/${email}`
        );
    }
    sendMailPostulantConfirmation(email: string,job:string): Observable<Result> {
        return this.httpClient.get<Result>(
            `${environment.apiURL}${this.apiController}/sendmailpostulantconfirmation/${email}/${job}`
        );
    }

    changePaswordConfig(item): Observable<Result> {
        return this.httpClient.post<Result>(
            `${environment.apiURL}${this.apiController}/changepasswordconfig`, item);
    }

    deleteuser(item): Observable<Result> {
        return this.httpClient.post<Result>(
            `${environment.apiURL}${this.apiController}/deleteuser`, item);
    }
}
