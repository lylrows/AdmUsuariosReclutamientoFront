import { User } from './../../shared/models/user.model';
import { UserResetPassword } from './../schema/user/UserResetPassword';
import { Result } from './../schema/result';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { SendRessetPasswordCode } from './../schema/user/SendRessetPasswordCode';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JobService {
    private apiController = '/Job';

    constructor(private httpClient: HttpClient) {}

    

    getbyid(id: number): Observable<Result> {
        return this.httpClient.get<Result>(
            `${environment.apiURL}${this.apiController}/getbyid/${id}`
        );
    }
    isjobpostulated(idjob: number,idpostulant:number): Observable<Result> {
        return this.httpClient.get<Result>(
            `${environment.apiURL}${this.apiController}/isjobpostulated/${idjob}/${idpostulant}`
        );
    }
    
    addjobpostulant(newJobPostulant:any): Observable<any> {
        return this.httpClient.post<Result>(`${environment.apiURL}${this.apiController}/addjobpostulant`, newJobPostulant);
    }

    getrelatedjobs(id: number): Observable<Result> {
        return this.httpClient.get<Result>(
            `${environment.apiURL}${this.apiController}/getrelatedjobs/${id}`
        );
    }

    getotherjobs(): Observable<Result> {
        return this.httpClient.get<Result>(
            `${environment.apiURL}${this.apiController}/getotherjobs`
        );
    }

    getalljobs(jobFilter:any): Observable<Result> {
        return this.httpClient.post<Result>(`${environment.apiURL}${this.apiController}/getalljobs`, jobFilter);
    }

}
