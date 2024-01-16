import { EventEmitter, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class SkillsEventService {
    saveInformation$ = new EventEmitter<boolean>();
    constructor() { }
    
}