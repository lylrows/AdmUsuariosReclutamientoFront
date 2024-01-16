import { environment } from './../../../environments/environment';
import { Result } from './../schema/result';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SalaryPreferenceModel } from '../schema/salarypreference.model';

@Injectable({providedIn: 'root'})
export class SalaryJobService {

    private apiController = '/SalaryPreference';

    constructor(private httpClient: HttpClient) { }
 
    add(item: SalaryPreferenceModel): Observable<Result> {
        return this.httpClient.post<Result>(`${environment.apiURL}${this.apiController}/add`, item);
    }

    update(item: SalaryPreferenceModel): Observable<Result> {
        return this.httpClient.post<Result>(`${environment.apiURL}${this.apiController}/update`, item);
    }

    get(idPerson): Observable<Result> {
        return this.httpClient.get<Result>(`${environment.apiURL}${this.apiController}/getsalarypreference/${idPerson}`);
    }
}