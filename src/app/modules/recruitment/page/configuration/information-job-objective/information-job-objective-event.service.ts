import { EventEmitter, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class InformationJobObjectiveEventService {
    saveInformation$ = new EventEmitter<boolean>();
    editInformation$ = new EventEmitter<boolean>();
    constructor() { }
    
}