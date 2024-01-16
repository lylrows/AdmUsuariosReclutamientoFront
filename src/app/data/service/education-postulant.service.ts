import { MonthDb } from './../mocks/months';
import { YearsDb } from './../mocks/years';
import { InformationEducationModel } from './../schema/informationEducation.model';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Result } from './../schema/result';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable(
    {providedIn: 'root'}
    )
export class EducationPostulantService {

    private apiController = '/EducationPostulant';
    public years: any;
    public month: any;
    public saveUserAssign$ = new EventEmitter<boolean>();

    constructor(private httpClient: HttpClient) {
        let yearsdb = new YearsDb();
        this.years = yearsdb.years;

        let monthdb = new MonthDb();
        this.month = monthdb.month;
     }
    
    add(item: InformationEducationModel): Observable<Result> {
        return this.httpClient.post<Result>(`${environment.apiURL}${this.apiController}/add`, item);
    }

    update(item: InformationEducationModel): Observable<Result> {
        return this.httpClient.post<Result>(`${environment.apiURL}${this.apiController}/update`, item);
    }

    get(idPerson): Observable<Result> {
        return this.httpClient.get<Result>(`${environment.apiURL}${this.apiController}/geteducationpostulant/${idPerson}`);
    }
}