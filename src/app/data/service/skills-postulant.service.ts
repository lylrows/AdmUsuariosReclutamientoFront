import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Result } from './../schema/result';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class SkillsPostulantService {
    private apiController = '/SkillsPostulant';

    constructor(private httpClient: HttpClient) { }

    add(item): Observable<Result> {
        return this.httpClient.post<Result>(`${environment.apiURL}${this.apiController}/add`, item);
    }

    delete(item): Observable<Result> {
        return this.httpClient.post<Result>(`${environment.apiURL}${this.apiController}/delete`, item);
    }

    get(idPerson): Observable<Result> {
        return this.httpClient.get<Result>(`${environment.apiURL}${this.apiController}/getskillspostulant/${idPerson}`);
    }

    getByName(name): Observable<Result> {
        return this.httpClient.get<Result>(`${environment.apiURL}${this.apiController}/getskillsbyname/${name}`);
    }
    
}