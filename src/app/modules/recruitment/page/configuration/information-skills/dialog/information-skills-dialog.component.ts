import { SkillsPostulantService } from './../../../../../../data/service/skills-postulant.service';
import { Skills } from './../../../../../../data/schema/skills.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { SkillsEventService } from '../information-skills-event.service';


@Component({
    selector: 'app-information-skills-dialog',
    templateUrl: 'information-skills-dialog.component.html',
    styleUrls: ['information-skills-dialog.component.scss'],
})


export class InformationSkillsDialogComponent implements OnInit {
    title?: string;
    closeBtnName?: string;
    list: any;
    form: FormGroup;
    idperson: number;
    keyword = 'descriptionSkill';
    data = [];
    lstSkills: Skills[] = [];
    Regskills: any[] = [];

    constructor(public bsModalRef: BsModalRef, 
                private fb: FormBuilder, 
                private skillsService: SkillsPostulantService,
                private messageService: MessageService,
                private eventService: SkillsEventService) {}

    ngOnInit() {
        console.log(this.Regskills);
        this.buildFormGroup(this.list);
    }

    buildFormGroup(data) {
        this.form = this.fb.group({
            id: [data.id || null],
            skills: [data.carreer || '', Validators.required],
            idPerson: [this.idperson, Validators.required],
        });
    }

    selectEvent(item) {
       item.idPerson = this.idperson;
       console.log(item);
       this.lstSkills.push(item);
       this.form.get('skills').setValue('');
    }

    onChangeSearch(val: string) {
        this.skillsService.getByName(val).subscribe(res => {
            this.data = res.data;
        })
    }

    onFocused(e) {
        // do something when input is focused
    }

    remove(index) {
     this.lstSkills.splice(index, 1);
    }

    submit() {
        if (this.validarSkills() && this.validarSkillsGuardados()){
                this.skillsService.add(this.lstSkills).subscribe(res => {
                    if (res.stateCode == 200) {
                        this.eventService.saveInformation$.emit(true);
                        this.bsModalRef.hide();
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: res.messageError[0],
                        });
                    }
                })
        }
    }

    validarSkills(){
        let validar = true;
        let conocimiento = '';
        for(let el of this.lstSkills){
            const duplicados = this.lstSkills.filter(x => x.descriptionSkill == el.descriptionSkill);
            if (duplicados.length > 1){
                validar = false;
                conocimiento = el.descriptionSkill;
                break;
            }
        }

        if (!validar){
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Conocimiento ' + conocimiento + ' está repetido.',
            });
        }
        return validar;
    }

    validarSkillsGuardados(){
        let validar = true;
        let conocimiento = '';
        for(let el of this.lstSkills){
            const duplicados = this.Regskills.filter(x => x.descriptionSkill == el.descriptionSkill);
            if (duplicados.length > 0){
                validar = false;
                conocimiento = el.descriptionSkill;
                break;
            }
        }

        if (!validar){
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Conocimiento ' + conocimiento + ' ya registrado.',
            });
        }
        return validar;
    }
}
