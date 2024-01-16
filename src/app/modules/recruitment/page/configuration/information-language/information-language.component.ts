import { InformationLanguagePostulant } from './../../../../../data/schema/informationLanguage.model';
import { InformationLanguageEventService } from './information-education-event.service';
import { LanguagePostulantService } from './../../../../../data/service/language-postulant.service';
import { Subscription } from 'rxjs';
import { InformationLanguageDialogComponent } from './dialog/information-language-dialog.component';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-information-language',
    templateUrl: 'information-language.component.html',
    styleUrls: ['information-language.component.scss']
})

export class InformationLanguageComponent implements OnInit, OnDestroy {
    @Input() user: any;
    bsModalRef?: BsModalRef;
    saveInformation: Subscription;
    editInformation: Subscription;
    lstInformacion: InformationLanguagePostulant[];
    constructor(private modalService: BsModalService,
        private languagePostulatService: LanguagePostulantService, 
        private eventService: InformationLanguageEventService,
        private messageService: MessageService) { }

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
        this.languagePostulatService.get(this.user?.idPerson).subscribe(res => {
             this.lstInformacion = res.data;
        })
    }

    openModalWithComponent(data, isNew?) {
        const initialState: ModalOptions = {
          initialState: {
            list: data,
            title: isNew ? 'Agregar idioma': 'Actualizar Idioma',
            idperson: this.user.idPerson
          },
        };
        this.bsModalRef = this.modalService.show(InformationLanguageDialogComponent, initialState);
        this.bsModalRef.content.closeBtnName = 'Cerrar';
      }

      delete(item) {
        this.messageService.clear();
        this.messageService.add({key: 'delete-l', sticky: true, severity:'warn', summary:'Quieres eliminar tu idioma?', detail:'', data: item});
     }

     onConfirm(data) {
        data.active = false;
        this.languagePostulatService.update(data).subscribe(
            res => {
                if (res.stateCode == 200) {
                   this.messageService.add({
                       severity: 'success',
                       summary: 'Exitoso',
                       detail: 'Eliminado correctamente',
                     });
                     this.loadInformation();
                     this.messageService.clear('delete-l');
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
        this.messageService.clear('delete-l');
    }

      ngOnDestroy(): void {
          this.saveInformation.unsubscribe();
          this.editInformation.unsubscribe();
      }
}