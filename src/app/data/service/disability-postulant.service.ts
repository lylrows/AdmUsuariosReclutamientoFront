import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Result } from './../schema/result';
import { DisabilityPostulantModel } from './../schema/disabilitypostulant.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class DisabilityService {
    private apiController = '/Disability';
    constructor(private httpClient: HttpClient) { }
    
    add(item: any): Observable<Result> {
        return this.httpClient.post<Result>(`${environment.apiURL}${this.apiController}/add`, item);
    }

    update(item: any): Observable<Result> {
        return this.httpClient.post<Result>(`${environment.apiURL}${this.apiController}/update`, item);
    }

    get(idPerson): Observable<Result> {
        return this.httpClient.get<Result>(`${environment.apiURL}${this.apiController}/getdisability/${idPerson}`);
    }
}