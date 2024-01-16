import { environment } from './../../../environments/environment';
import { Result } from './../schema/result';
import { Observable } from 'rxjs';
import { PersonImg } from './../schema/person-img.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class PersonService {
    private apiController = '/Person';

    constructor(private httpClient: HttpClient) { }

    uploadimg(item: any): Observable<Result> {
        return this.httpClient.post<Result>(`${environment.apiURL}${this.apiController}/uploadimg`, item);
    }

    uploadcv(item: any): Observable<Result> {
        return this.httpClient.post<Result>(`${environment.apiURL}${this.apiController}/uploadcv`, item);
    }

    get(idPerson: any): Observable<Result> {
        return this.httpClient.get<Result>(`${environment.apiURL}${this.apiController}/getperson/${idPerson}`);
    }

    updateInformationPersonal(item: any): Observable<Result> {
        return this.httpClient.patch<Result>(`${environment.apiURL}${this.apiController}/updatepersoninformation`, item);
    }

    updateInformationContact(item: any): Observable<Result> {
        return this.httpClient.patch<Result>(`${environment.apiURL}${this.apiController}/updatecontactinformation`, item);
    }

    deleteCv(idPerson: any): Observable<Result> {
        return this.httpClient.get<Result>(`${environment.apiURL}${this.apiController}/deletecv/${idPerson}`);
    }
    
}