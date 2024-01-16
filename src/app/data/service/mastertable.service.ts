import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Result } from './../schema/result';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class MasterTableService {
    private apiController = '/MasterTable';


    constructor(private httpClient: HttpClient) { }

    get(idType): Observable<Result> {
        return this.httpClient.get<Result>(`${environment.apiURL}${this.apiController}/getmastertabletype/${idType}`);
    }
    
    getallpublic(idType): Observable<Result> {
        return this.httpClient.get<Result>(`${environment.apiURL}${this.apiController}/getmastertabletypepublic/${idType}`);
    }

    getcategoriespublic(): Observable<Result> {
        return this.httpClient.get<Result>(`${environment.apiURL}${this.apiController}/getCategoryEmploymentpublic`);
    }
 
}