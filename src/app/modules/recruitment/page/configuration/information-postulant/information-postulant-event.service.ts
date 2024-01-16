import { EventEmitter, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class InformationPostulantEventService {
    editInformation$ = new EventEmitter<boolean>();
    delete$ = new EventEmitter<boolean>();
    saveimg$ = new EventEmitter<any>();
    constructor() { }
    
}