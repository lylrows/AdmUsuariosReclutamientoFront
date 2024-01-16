import { SalaryJobService } from './../../../../../data/service/salary-job.service';
import { JobObjectiveService } from './../../../../../data/service/job-objective.service';
import { Subscription } from 'rxjs';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { JobObjectiveModel } from 'src/app/data/schema/jobobjective.model';
import { MessageService } from 'primeng/api';
import { InformationJobObjectiveEventService } from '../information-job-objective/information-job-objective-event.service';
import { InformationSalaryEventService } from './information-salary-event.service';
import { SalaryPreferenceDialogComponent } from './dialog/salary-preference-dialog.component';

@Component({
    selector: 'app-information-salary',
    templateUrl: 'information-salary.component.html',
    styleUrls: ['information-salary.component.scss']
})

export class InformationSalaryComponent implements OnInit, OnDestroy {

    bsModalRef?: BsModalRef;
    @Input() user: any;
    saveInformation: Subscription;
    editInformation: Subscription;
    lstInformacion: JobObjectiveModel[] = [];

    constructor(private modalService: BsModalService,
        private messageService: MessageService,
        private eventService: InformationSalaryEventService,
        private salaryjobService: SalaryJobService) { }

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
                    ? 'Agregar preferencia salarial'
                    : 'Editar preferencia salarial',
                idperson: this.user.idPerson,
            },
            class: 'gray modal-lg',
        };
        this.bsModalRef = this.modalService.show(
            SalaryPreferenceDialogComponent,
            initialState
        );
        this.bsModalRef.content.closeBtnName = 'Cerrar';
    }

    loadData() {
        this.salaryjobService.get(this.user?.idPerson).subscribe((res) => {
            this.lstInformacion = res.data;
            console.log(this.lstInformacion);
        });
    }

    delete(item) {
        this.messageService.clear();
        this.messageService.add({
            key: 'delete-s',
            sticky: true,
            severity: 'warn',
            summary: 'Quieres eliminar tu preferencia salarial?',
            detail: '',
            data: item,
        });
    }

    onConfirm(data) {
        data.active = false;
        this.salaryjobService.update(data).subscribe((res) => {
            if (res.stateCode == 200) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exitoso',
                    detail: 'Eliminado correctamente',
                });
                this.loadData();
                this.messageService.clear('delete-s');
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
        this.messageService.clear('delete-s');
    }

    ngOnDestroy(): void {
        this.saveInformation.unsubscribe();
        this.editInformation.unsubscribe();
    }
}