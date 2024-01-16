import { Result } from './../schema/result';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecruitmentAreaService {
    private apiController = '/RecruitmentArea';

    constructor(private httpClient: HttpClient) {}

    // getall(): Observable<any> {
    //     return this.httpClient.get<any>(`${environment.apiURL}${this.apiController}/getall`);
    // }
    getall(idEmpresa: number): Observable<Result> {
      
        return this.httpClient.get<Result>(`${environment.apiURL}${this.apiController}/getall/${idEmpresa}`);
    }

    
}
