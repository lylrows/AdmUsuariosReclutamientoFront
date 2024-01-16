import { EventEmitter, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class InformationLanguageEventService {
    saveInformation$ = new EventEmitter<boolean>();
    editInformation$ = new EventEmitter<boolean>();
    constructor() { }
    
}