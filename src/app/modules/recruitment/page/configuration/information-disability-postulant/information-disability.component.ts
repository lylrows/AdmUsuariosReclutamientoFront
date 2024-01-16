import { DisabilityEventService } from './information-disability.event.service';
import { DisabilityService } from './../../../../../data/service/disability-postulant.service';
import { Subscription } from 'rxjs';
import { DisabilityPostulantModel } from './../../../../../data/schema/disabilitypostulant.model';
import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { DisabilityDialogComponent } from './dialog/disability-dialog.component';

@Component({
    selector: 'app-information-disability',
    templateUrl: 'information-disability.component.html',
    styleUrls: ['information-disability.component.scss']
})

export class InformationDisabilityomponent implements OnInit {
    bsModalRef?: BsModalRef;
    @Input() user: any;
    saveInformation: Subscription;
    editInformation: Subscription;
    lstInformacion: DisabilityPostulantModel = {
        id: null,
        active: null,
        certificateFileBuffer: '',
        certificateFileName: '',
        certificateFolder: '',
        description: '',
        idPerson: 0
    };

    constructor(
        private modalService: BsModalService,
        private messageService: MessageService,
        private eventService: DisabilityEventService,
        private disabilityService: DisabilityService
    ) { }

    ngOnInit() {
        this.saveInformation = this.eventService.saveInformation$.subscribe(
            (res) => {
                if (res == true) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Exitoso',
                        detail: 'Grabado correctamente',
                    });
                    this.loadData();
                }
            }
        );
        this.loadData();
     }

    openModalWithComponent(data, isNew?) {
        const initialState: ModalOptions = {
            initialState: {
                list: data,
                title: isNew
                    ? 'Discapacidad'
                    : 'Discapacidad',
                idperson: this.user.idPerson,
            },
            class: 'gray modal-md',
        };
        this.bsModalRef = this.modalService.show(
            DisabilityDialogComponent,
            initialState
        );
        this.bsModalRef.content.closeBtnName = 'Cerrar';
    }

    loadData() {
        this.disabilityService.get(this.user?.idPerson).subscribe((res) => {
            this.lstInformacion = res.data;
            console.log(this.lstInformacion);
        });
    }

    delete(item) {
        this.messageService.clear();
        this.messageService.add({
            key: 'delete-d',
            sticky: true,
            severity: 'warn',
            summary: 'Quieres eliminar el archivo?',
            detail: '',
            data: item,
        });
    }

    onConfirm(data) {
        data.active = false;
        this.disabilityService.update(data).subscribe((res) => {
            if (res.stateCode == 200) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exitoso',
                    detail: 'Eliminado correctamente',
                });
                this.loadData();
                this.messageService.clear('delete-d');
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: res.messageError[0],
                });
            }
        });
    }

    onReject() {
        this.messageService.clear('delete-d');
    }

    downLoad() {
        let link = document.createElement('a');
        let blobArchivo = this.base64ToBlob(this.lstInformacion.certificateFileBuffer, this.lstInformacion.fileType);
        let blob = new Blob([blobArchivo], { type: this.lstInformacion.fileType })
        link.href = URL.createObjectURL(blob);
        link.download = this.lstInformacion.certificateFileName;
        link.click();
    }

    public base64ToBlob(b64Data, contentType='', sliceSize=512) {
        b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
        let byteCharacters = atob(b64Data);
        let byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);
    
            let byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            let byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, {type: contentType});
    }

}