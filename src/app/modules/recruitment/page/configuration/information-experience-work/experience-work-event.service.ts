import { EventEmitter, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ExperienceWorkEventService {
    saveInformation$ = new EventEmitter<boolean>();
    editInformation$ = new EventEmitter<boolean>();
    constructor() { }
    
}