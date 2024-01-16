import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Result } from './../schema/result';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UtilsService {
    private apiController = '/Utils';

    constructor(private httpClient: HttpClient) { }

    getDepartament(): Observable<Result> {
        return this.httpClient.get<Result>(`${environment.apiURL}${this.apiController}/departament`);
    }

    getprovince(id): Observable<Result> {
        return this.httpClient.get<Result>(`${environment.apiURL}${this.apiController}/province/${id}`);
    }

    getdistrict(id): Observable<Result> {
        return this.httpClient.get<Result>(`${environment.apiURL}${this.apiController}/district/${id}`);
    }
    
}