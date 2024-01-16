import { JobObjectiveService } from './../../../../../../data/service/job-objective.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { InformationJobObjectiveEventService } from '../information-job-objective-event.service';

@Component({
    selector: 'app-job-objective-dialog',
    templateUrl: 'job-objective-dialog.component.html',
    styleUrls: ['job-objective-dialog.component.scss']
})

export class JobObjectiveDialogComponent implements OnInit {
    title?: string;
    closeBtnName?: string;
    list: any;
    form: FormGroup;
    idperson: number;
    constructor(public bsModalRef: BsModalRef,
        private fb: FormBuilder,
        private eventService: InformationJobObjectiveEventService,
        private messageService: MessageService,
        private jobObjectiveService: JobObjectiveService) { }

    ngOnInit() { 
        this.buildForm(this.list);
    }

    onReject() {
        this.bsModalRef.hide();
    }

    submit() {
        let dto = this.form.value;
        dto.active = true;
        if (dto.id == null) {
            this.jobObjectiveService.add(dto).subscribe((res) => {
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
            this.jobObjectiveService.update(dto).subscribe((res) => {
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

    buildForm(data) {
        this.form = this.fb.group({
            id: [data.id || null],
            description: [
                data.description || '',
                Validators.required,
            ],
            idPerson: [this.idperson],
        });
    }
}