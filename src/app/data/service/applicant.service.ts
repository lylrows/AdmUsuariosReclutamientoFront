import { environment } from './../../../environments/environment';
import { Result } from './../schema/result';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApplicantFilter } from '../schema/applicant.model';

@Injectable({ providedIn: 'root' })
export class ApplicantService {
    private apiController = '/Applications';

    constructor(private httpClient: HttpClient) {}

    getList(filter: ApplicantFilter): Observable<any> {
        return this.httpClient
            .post<any>(`${environment.apiURL}${this.apiController}`, filter);
    }

    getListJobs(IdUser: number): Observable<any> {
        return this.httpClient
            .get<any>(`${environment.apiURL}${this.apiController}/getjobs/${IdUser}`)
            .pipe(
                map((resp) => {
                    return resp.data;
                })
            );
    }

    getListState(IdUser: number): Observable<Result> {
        return this.httpClient
            .get<Result>(
                `${environment.apiURL}${this.apiController}/getstatelist/${IdUser}`
            )
            .pipe(
                map((result) => {
                    return result.data[0];
                })
            );
    }
}
