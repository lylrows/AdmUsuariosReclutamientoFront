import { Subscription } from 'rxjs';
import { InformationEducationModel } from './../../../../../data/schema/informationEducation.model';
import { EducationPostulantService } from './../../../../../data/service/education-postulant.service';
import { LanguagePostulantService } from './../../../../../data/service/language-postulant.service';
import { InformationEducationEventService } from './information-education-event.service';
import { InformationEducationDialogComponent } from './dialog/information-education-dialog.component';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-information-education',
    templateUrl: 'information-education.component.html',
    styleUrls: ['information-education.component.scss']
})

export class InformationEducationComponent implements OnInit, OnDestroy {
    @Input() user: any;
    bsModalRef?: BsModalRef;
    saveInformation: Subscription;
    editInformation: Subscription;
    lstInformacion: InformationEducationModel[] = [];
    constructor(private modalService: BsModalService,
                private eventService: InformationEducationEventService,
                private messageService: MessageService,
                private educationPostulatService: EducationPostulantService) { }

    ngOnInit() { 
        this.saveInformation = this.eventService.saveInformation$.subscribe(res => {
            if (res == true) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exitoso',
                    detail: 'Grabado correctamente',
                  });
                  this.loadInformation();
            }
        });
        this.editInformation = this.eventService.editInformation$.subscribe(res => {
            if (res == true) {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exitoso',
                    detail: 'Actualizado correctamente',
                  });
                  this.loadInformation();
            }
        });
        this.loadInformation();
    }

    loadInformation() {
        this.educationPostulatService.get(this.user?.idPerson).subscribe(res => {
             this.lstInformacion = res.data;
        })
    }

    openModalWithComponent(row, isNew?) {
        const initialState: ModalOptions = {
          initialState: {
            list: row,
            title: isNew ? 'Agregar estudio' : 'Actualizar estudio' ,
            idperson: this.user.idPerson,
            isNew:isNew
          },
          class: 'gray modal-lg'
        };
        this.bsModalRef = this.modalService.show(InformationEducationDialogComponent, initialState);
        this.bsModalRef.content.closeBtnName = 'Cerrar';
      }

      delete(item) {
        this.messageService.clear();
        this.messageService.add({key: 'delete-e', sticky: true, severity:'warn', summary:'Quieres eliminar tu estudio?', detail:'', data: item});
      }

      onConfirm(data) {
        data.active = false;
        this.educationPostulatService.update(data).subscribe(
            res => {
                if (res.stateCode == 200) {
                   this.messageService.add({
                       severity: 'success',
                       summary: 'Exitoso',
                       detail: 'Eliminado correctamente',
                     });
                     this.loadInformation();
                     this.messageService.clear('delete-e');
                } else {
                   this.messageService.add({
                       severity: 'error',
                       summary: 'Error',
                       detail: res.messageError[0],
                     });
                }
            }
        )
    }

      onReject() {
        this.messageService.clear('delete-e');
    }

      ngOnDestroy(): void {
          this.editInformation.unsubscribe();
          this.saveInformation.unsubscribe();
      }
}