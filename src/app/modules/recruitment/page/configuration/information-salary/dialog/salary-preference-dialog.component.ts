import { SalaryJobService } from './../../../../../../data/service/salary-job.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { InformationSalaryEventService } from '../information-salary-event.service';
import { createMask, InputmaskOptions } from '@ngneat/input-mask';

@Component({
    selector: 'app-salary-prefence-dialog',
    templateUrl: 'salary-preference-dialog.component.html',
    styleUrls: ['salary-preference-dialog.component.scss']
})

export class SalaryPreferenceDialogComponent implements OnInit {
    @Input() inputMask!: InputmaskOptions<any>;
    title?: string;
    closeBtnName?: string;
    list: any;
    form: FormGroup;
    idperson: number;

    currencyInputMask = createMask({
        alias: 'numeric',
        groupSeparator: ',',
        digits: 2,
        min: 0,
        max: 99999,
        digitsOptional: false,
        prefix: 'S/ ',
        placeholder: "0.00",
      });


    constructor(
        public bsModalRef: BsModalRef,
        private fb: FormBuilder,
        private eventService: InformationSalaryEventService,
        private messageService: MessageService,
        private salaryPreferenceService: SalaryJobService
    ) { }

    ngOnInit() {
        this.buildForm(this.list);
     }

    buildForm(data) {
        console.log(data);
        this.form = this.fb.group({
            id: [data.id || null],
            monto: [
                data.monto ,
                [Validators.required],
            ],
            idPerson: [this.idperson],
        });
    }

    submit() {
        let dto = this.form.value;
        dto.active = true;
        if (dto.id == null) {
            this.salaryPreferenceService.add(dto).subscribe((res) => {
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
            this.salaryPreferenceService.update(dto).subscribe((res) => {
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

    onReject() {
        this.bsModalRef.hide();
    }
}