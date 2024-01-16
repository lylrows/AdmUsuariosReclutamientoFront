import { environment } from './../../../environments/environment';
import { Result } from './../schema/result';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class CountryService {
    private apiController = '/Country';

    constructor(private httpClient: HttpClient) { }
 
    get(): Observable<Result> {
        return this.httpClient.get<Result>(`${environment.apiURL}${this.apiController}/getcountry`);
    }
}