import { JobObjectiveService } from './../../../../../data/service/job-objective.service';
import { Subscription } from 'rxjs';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { JobObjectiveDialogComponent } from './dialog/job-objective-dialog.component';
import { JobObjectiveModel } from 'src/app/data/schema/jobobjective.model';
import { InformationJobObjectiveEventService } from './information-job-objective-event.service';

@Component({
    selector: 'app-information-job-objective',
    templateUrl: 'information-job-objective.component.html',
    styleUrls: ['information-job-objective.component.scss'],
})
export class InformationJobObjectiveComponent implements OnInit, OnDestroy {
    bsModalRef?: BsModalRef;
    @Input() user: any;
    saveInformation: Subscription;
    editInformation: Subscription;
    lstInformacion: JobObjectiveModel[] = [];
    constructor(
        private modalService: BsModalService,
        private messageService: MessageService,
        private eventService: InformationJobObjectiveEventService,
        private jobObjectiveService: JobObjectiveService
    ) {}

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
        this.editInformation = this.eventService.editInformation$.subscribe(
            (res) => {
                if (res == true) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Exitoso',
                        detail: 'Actualizado correctamente',
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
                    ? 'Agregar referencia laboral'
                    : 'Actualizar referencia laboral',
                idperson: this.user.idPerson,
            },
            class: 'gray modal-lg',
        };
        this.bsModalRef = this.modalService.show(
            JobObjectiveDialogComponent,
            initialState
        );
        this.bsModalRef.content.closeBtnName = 'Cerrar';
    }

    loadData() {
        this.jobObjectiveService.get(this.user?.idPerson).subscribe((res) => {
            this.lstInformacion = res.data;
        });
    }

    delete(item) {
        this.messageService.clear();
        this.messageService.add({
            key: 'delete-o',
            sticky: true,
            severity: 'warn',
            summary: 'Quieres eliminar tu referencia laboral?',
            detail: '',
            data: item,
        });
    }

    onConfirm(data) {
        data.active = false;
        this.jobObjectiveService.update(data).subscribe((res) => {
            if (res.stateCode == 200) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exitoso',
                    detail: 'Eliminado correctamente',
                });
                this.loadData();
                this.messageService.clear('delete-o');
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
        this.messageService.clear('delete-o');
    }

    ngOnDestroy(): void {
        this.saveInformation.unsubscribe();
        this.editInformation.unsubscribe();
    }
}
