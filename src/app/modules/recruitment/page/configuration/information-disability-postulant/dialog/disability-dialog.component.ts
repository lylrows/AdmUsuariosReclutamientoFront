import { DisabilityService } from './../../../../../../data/service/disability-postulant.service';
import { DisabilityEventService } from './../information-disability.event.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-disability-dialog',
    templateUrl: 'disability-dialog.component.html',
    styleUrls: ['disability-dialog.component.scss']
})

export class DisabilityDialogComponent implements OnInit {
    title?: string;
    closeBtnName?: string;
    list: any;
    form: FormGroup;
    idperson: number;
    nameFile: string;
    archivo: any;

    constructor(public bsModalRef: BsModalRef,
        private fb: FormBuilder,
        private eventService: DisabilityEventService,
        private messageService: MessageService,
        private disabilityService: DisabilityService) { }

    ngOnInit() {
        this.buildForm(this.list);
     }

    buildForm(data) {
        this.form = this.fb.group({
            id: [data.id || null],
            certificateFileName: [
                data.monto || ''
            ],
            certificateFolder: [
                data.monto || ''
            ],
            description: [
                data.monto || ''
            ],
            idPerson: [this.idperson],
        });
    }

    submit() {
        const formData = new FormData();
        formData.append('files', this.archivo);
        let dto = this.form.value;
        dto.active = true;
        formData.append('request', JSON.stringify(dto))
        if (dto.id == null) {
            this.disabilityService.add(formData).subscribe((res) => {
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
        }
    }

    captureFile(event) {
        this.archivo=event.target.files[0];
        this.nameFile = "<i class='icon-p pi pi-file'></i><span>" + this.archivo.name + "</span>";

        if (parseInt((event.target.files[0].size / 1024 / 1024).toFixed(1)) > 3.5) {
            this.archivo = null;
            this.nameFile = "";
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'El tamaño máximo permitido es de 3.5mb',
            });
      
            return;
          }
    }

    deletefile() {
        this.archivo = null;
        this.nameFile = "";
        return false;
      }
}