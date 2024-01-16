import { InformationLanguagePostulant } from './../schema/informationLanguage.model';
import { environment } from './../../../environments/environment';
import { Result } from './../schema/result';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class LanguagePostulantService {

    private apiController = '/LanguagePostulant';

    constructor(private httpClient: HttpClient) { }

    add(item: InformationLanguagePostulant): Observable<Result> {
        return this.httpClient.post<Result>(`${environment.apiURL}${this.apiController}/add`, item);
    }

    update(item: InformationLanguagePostulant): Observable<Result> {
        return this.httpClient.post<Result>(`${environment.apiURL}${this.apiController}/update`, item);
    }

    get(idPerson): Observable<Result> {
        return this.httpClient.get<Result>(`${environment.apiURL}${this.apiController}/getlanguagepostulant/${idPerson}`);
    }
    
}