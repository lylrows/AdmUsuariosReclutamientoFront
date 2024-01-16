import { Subscription } from 'rxjs';
import { SkillsPostulantService } from './../../../../../data/service/skills-postulant.service';
import { Skills } from './../../../../../data/schema/skills.model';
import { InformationSkillsDialogComponent } from './dialog/information-skills-dialog.component';
import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SkillsEventService } from './information-skills-event.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-information-skills',
    templateUrl: 'information-skills.component.html',
    styleUrls: ['information-skills.component.scss']
})

export class InformationSkillsComponent implements OnInit {
    bsModalRef?: BsModalRef;
    @Input() user: any;
    lstSkills: Skills[] = [];
    saveSkills: Subscription;
    constructor(private modalService: BsModalService, 
                private skillService: SkillsPostulantService,
                private eventService: SkillsEventService,
                private messageService: MessageService) { }

    ngOnInit() { 
      this.saveSkills = this.eventService.saveInformation$.subscribe(res => {
          if (res == true) {
            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: 'Grabado correctamente',
          });
          this.loadSkills();
          }
      });
      this.loadSkills();
    }

    openModalWithComponent(data, isNew?) {
        const initialState: ModalOptions = {
          initialState: {
            list: [
              'Open a modal with component',
              'Pass your data',
              'Do something else',
              '...'
            ],
            Regskills: this.lstSkills,
            title: isNew ? 'Agregar conocimientos y habilidades' : 'Actualizar conocimientos y habilidades',
            idperson: this.user.idPerson
          },
          class: 'gray modal-lg'
        };
        this.bsModalRef = this.modalService.show(InformationSkillsDialogComponent, initialState);
        this.bsModalRef.content.closeBtnName = 'Cerrar';
      }

      loadSkills() {
        this.skillService.get(this.user?.idPerson).subscribe(
          res => {
            this.lstSkills = res.data;
          }
        )
      }

      Delete(item) {
        this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Quieres eliminar tu conocimiento o habilidad?', detail:'', data: item});
      }

      onConfirm(data) {
        this.skillService.delete(data).subscribe(res => {
          if (res.stateCode == 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: 'Conocimiento eliminado',
          });
          this.loadSkills();
          this.messageService.clear('c');
          }else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.messageError[0],
          });
          }
        })
    }

      onReject() {
        this.messageService.clear('c');
    }
}