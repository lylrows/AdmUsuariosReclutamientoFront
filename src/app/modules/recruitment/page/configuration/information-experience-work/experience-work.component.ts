import { WorkExperienceService } from './../../../../../data/service/work-experience.service';
import { ExperienceWorkEventService } from './experience-work-event.service';
import { ExperienceWorkDialogComponent } from './dialog/experience-work-dialog.component';
import { Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { WorkExperienceModel } from 'src/app/data/schema/workexperience.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-work-experience',
    templateUrl: 'experience-work.component.html',
    styleUrls: ['experience-work.component.scss'],
})
export class ExperienceWorkComponent implements OnInit {
    @Input() user: any;
    bsModalRef?: BsModalRef;
    saveInformation: Subscription;
    editInformation: Subscription;
    lstInformacion: WorkExperienceModel[] = [];

    constructor(
        private modalService: BsModalService,
        private messageService: MessageService,
        private eventService: ExperienceWorkEventService,
        private workExperienceService: WorkExperienceService,
        private domSanitizer:DomSanitizer
    ) {}

    getInnerHTMLValue(texto: string){
        return this.domSanitizer.bypassSecurityTrustHtml(texto);
      }

    ngOnInit() {
        this.saveInformation = this.eventService.saveInformation$.subscribe(
            (res) => {
                if (res == true) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Exitoso',
                        detail: 'Grabado correctamente',
                    });
                    this.loadInformation();
                }
            }
        );
        this.editInformation = this.eventService.editInformation$.subscribe(
            (res) => {
                if (res == true) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Exitoso',
                        detail: 'Actualizado correctamente',
                    });
                    this.loadInformation();
                }
            }
        );
        this.loadInformation();
    }

    delete(item) {
        this.messageService.clear();
        this.messageService.add({key: 'delete-exp', sticky: true, severity:'warn', summary:'Quieres eliminar tu conocimiento o habilidad?', detail:'', data: item});
    }

    openModalWithComponent(row, isNew?) {
        const initialState: ModalOptions = {
            initialState: {
                list: row,
                title: isNew
                    ? 'Agregar Experiencia Laboral'
                    : 'Actualizar Experiencia Laboral',
                idperson: this.user.idPerson,
            },
            class: 'gray modal-lg',
        };
        this.bsModalRef = this.modalService.show(
            ExperienceWorkDialogComponent,
            initialState
        );
        this.bsModalRef.content.closeBtnName = 'Cerrar';
    }

    loadInformation() {
        this.workExperienceService.get(this.user?.idPerson).subscribe((res) => {
            this.lstInformacion = res.data;
        });
    }

    onConfirm(data) {
        data.active = false;
        this.workExperienceService.update(data).subscribe((res) => {
            if (res.stateCode == 200) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exitoso',
                    detail: 'Eliminado correctamente',
                });
                this.loadInformation();
                this.messageService.clear('delete-exp');
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
        this.messageService.clear('delete-exp');
    }
}
