import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Result } from './../schema/result';
import { JobObjectiveModel } from './../schema/jobobjective.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class JobObjectiveService {
    private apiController = '/JobObjective';
    constructor(private httpClient: HttpClient) { }

    add(item: JobObjectiveModel): Observable<Result> {
        return this.httpClient.post<Result>(`${environment.apiURL}${this.apiController}/add`, item);
    }

    update(item: JobObjectiveModel): Observable<Result> {
        return this.httpClient.post<Result>(`${environment.apiURL}${this.apiController}/update`, item);
    }

    get(idPerson): Observable<Result> {
        return this.httpClient.get<Result>(`${environment.apiURL}${this.apiController}/getjobobjective/${idPerson}`);
    }

    
}