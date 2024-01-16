import { MonthDb } from './../mocks/months';
import { YearsDb } from './../mocks/years';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Result } from './../schema/result';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkExperienceModel } from '../schema/workexperience.model';

@Injectable({providedIn: 'root'})
export class WorkExperienceService {
    private apiController = '/WorkExperience';
    public years: any;
    public month: any;

    constructor(private httpClient: HttpClient) { 
        let yearsdb = new YearsDb();
        this.years = yearsdb.years;

        let monthdb = new MonthDb();
        this.month = monthdb.month;
    }

    add(item: WorkExperienceModel): Observable<Result> {
        return this.httpClient.post<Result>(`${environment.apiURL}${this.apiController}/add`, item);
    }

    update(item: WorkExperienceModel): Observable<Result> {
        return this.httpClient.post<Result>(`${environment.apiURL}${this.apiController}/update`, item);
    }

    get(idPerson): Observable<Result> {
        return this.httpClient.get<Result>(`${environment.apiURL}${this.apiController}/getworkexperience/${idPerson}`);
    }
    
}