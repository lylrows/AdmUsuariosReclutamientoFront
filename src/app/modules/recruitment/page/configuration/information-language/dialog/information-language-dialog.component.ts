import { MasterTableService } from './../../../../../../data/service/mastertable.service';
import { InformationLanguagePostulant } from './../../../../../../data/schema/informationLanguage.model';
import { InformationLanguageEventService } from './../information-education-event.service';
import { LanguagePostulantService } from './../../../../../../data/service/language-postulant.service';
import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-information-language-dialog',
    templateUrl: 'information-language-dialog.component.html',
    styleUrls: ['information-language-dialog.component.scss']
})
export class InformationLanguageDialogComponent implements OnInit {
    title?: string;
    closeBtnName?: string;
    list: any;
    form: FormGroup;
    idperson: number;
    itemMaster: any[] = [];
    itemLang: any[] = [];

    constructor(
        public bsModalRef: BsModalRef,
        private languagePostulatService: LanguagePostulantService,
        private eventService: InformationLanguageEventService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private mastertableService: MasterTableService
    ) {}

    ngOnInit() {
        this.buildForm(this.list);
        this.getType(88);
        this.getLang(93);
    }

    buildForm(data) {
        this.form = this.fb.group({
            id: [data.id || null],
            idLanguagePostulant: [
                data.idLanguagePostulant || null,
                Validators.required,
            ],
            idWrittenLeven: [data.idWrittenLeven || null, Validators.required],
            idOralLeven: [data.idOralLeven || null, Validators.required],
            idPerson: [this.idperson],
        });
    }

    getType(idType) {
        this.mastertableService.get(idType).subscribe(
            res => {
                 this.itemMaster = res.data;
            }
        )
    }

    getLang(idType) {
        this.mastertableService.get(idType).subscribe(
            res => {
                 this.itemLang = res.data;
            }
        )
    }

    submit() {
        const dto: InformationLanguagePostulant = {
            id: this.form.get('id').value,
            idPerson: this.form.get('idPerson').value,
            idLanguagePostulant: parseFloat(
                this.form.get('idLanguagePostulant').value
            ),
            idOralLeven: parseFloat(this.form.get('idOralLeven').value),
            idWrittenLeven: parseFloat(this.form.get('idWrittenLeven').value),
            active: true
        };

        if (dto.id == null) {
            this.languagePostulatService.add(dto).subscribe((res) => {
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
            });
        } else {
            this.languagePostulatService.update(dto).subscribe((res) => {
                if (res.stateCode == 200) {
                    this.eventService.editInformation$.emit(true);
                    this.bsModalRef.hide();
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: res.messageError[0],
                    });
                }
            });
        }
    }
}
