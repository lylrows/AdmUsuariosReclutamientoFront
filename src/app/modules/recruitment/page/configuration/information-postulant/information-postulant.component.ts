import { Subscription } from 'rxjs';
import { InformationPostulantEventService } from './information-postulant-event.service';
import { PersonDto } from 'src/app/data/schema/person.model';
import { PersonService } from './../../../../../data/service/person.service';
import { PersonImg } from './../../../../../data/schema/person-img.model';
import { InformationContactDialogComponent } from './dialog-information-contact/information-contact-dialog.component';
import { MessageService } from 'primeng/api';
import { DialogInformationPersonalComponent } from './dialog-information-personal/dialog-information-personal.component';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-information-postulant',
    templateUrl: 'information-postulant.component.html',
    styleUrls: ['information-postulant.component.scss']
})

export class InformationPostulantComponent implements OnInit, OnDestroy, OnChanges {
    @Input() user: any;
    @Input() person: PersonDto;
    bsModalRef?: BsModalRef;
    data: any = {};

    error: string;
    dragAreaClass: string;
    draggedFiles: any;
    file: any;
    archivo: any;
    namefile: string = '';
    personimg: PersonImg;
    imgPerfil: string;
    editPerson: Subscription;
    constructor(private messageService: MessageService,
                private modalService: BsModalService,
                private personService: PersonService,
                private eventService: InformationPostulantEventService) {
                
                 }

    ngOnInit() {
        this.editPerson = this.eventService.editInformation$.subscribe(res => {
          if (res == true) {
            this.messageService.add({
              severity: 'success',
              summary: 'Exitoso',
              detail: 'Actualizado correctamente',
            });
            this.loadPerson();
          }
        })
     }

     ngOnChanges(changes: SimpleChanges): void {
          if (changes.person && changes.person.currentValue != undefined) {
            this.imgPerfil = this.person.img;
            if (this.imgPerfil == null) {
              this.imgPerfil = '../../../../assets/img/user-default.jpg';
            }
            this.person = changes.person.currentValue;
            console.log('this.person', this.person);
            this.namefile = this.person.cvName;
            this.personimg = {
              idPerson: this.person.id,
              name: this.person.cvName,
              archivo: this.person.cvFile,
              contentType: this.person.contentType
            }

            console.log(this.namefile);
          }
     }


     loadPerson() {
       this.personService.get(this.user?.idPerson).subscribe(res => {
        console.log('this.person', this.person);
         this.person = res.data;
      
       })
     }

    openModalWithComponent() {
        const initialState: ModalOptions = {
          initialState: {
            list: this.person,
            title: 'Datos personales' ,
            idperson: this.user.idPerson
          },
          class: 'gray modal-lg'
        };
        this.bsModalRef = this.modalService.show(DialogInformationPersonalComponent, initialState);
        this.bsModalRef.content.closeBtnName = 'Cerrar';
      }

      openModalContact() {
        const initialState: ModalOptions = {
          initialState: {
            list: this.person,
            title: 'Datos de contacto' ,
            idperson: this.user.idPerson
          },
          class: 'gray modal-lg'
        };
        this.bsModalRef = this.modalService.show(InformationContactDialogComponent, initialState);
        this.bsModalRef.content.closeBtnName = 'Cerrar';
      }

      onFileChange(event){

      }
    
      saveFiles(files: FileList) {
    
        if (files.length > 1) this.error = "Only one file at time allow";
        else {
          this.error = "";
          console.log(files[0].size,files[0].name,files[0].type);
          this.draggedFiles = files;
          console.log(files);
        }
      }

      files: any[] = [];

      /**
       * on file drop handler
       */
      onFileDropped($event) {
        this.prepareFilesList($event);
      }
    
      /**
       * handle file from browsing
       */
      fileBrowseHandler(files) {
        this.archivo = files[0];
        this.namefile = this.archivo.name;
        this.prepareFilesList(files);
      }
    
      /**
       * Delete file from files list
       * @param index (File index)
       */
      deleteFile() {
        this.personService.deleteCv(this.user?.idPerson).subscribe(res => {
             if (res.stateCode == 200) {
              this.files = [];
              this.archivo = null;
              this.namefile = '';
             } else {
                  this.messageService.add({
                    summary: 'error',
                    severity: 'Error',
                    detail: res.messageError[0]
                  })
             }
        })
      }
    
      /**
       * Simulate the upload process
       */
      uploadFilesSimulator(index: number) {
          if (index === this.files.length) {
            return;
          } else {
                this.archivo = this.files[index];
                this.namefile = this.archivo.name;
                let dto: PersonImg = {
                    idPerson: this.user?.idPerson,
                    name: this.namefile
                }

                this.uploadcv(this.archivo, dto);
          }
      }
    
      /**
       * Convert Files list to normal array list
       * @param files (Files List)
       */
      prepareFilesList(files: Array<any>) {
        for (const item of files) {
          item.progress = 0;
          this.files.push(item);
        }
        this.uploadFilesSimulator(0);
      }
    
      /**
       * format bytes
       * @param bytes (File size in bytes)
       * @param decimals (Decimals point)
       */
      formatBytes(bytes, decimals) {
        if (bytes === 0) {
          return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
      }


      captureFile(event) {
        this.archivo=event.target.files[0];
        let dto: PersonImg = {
            idPerson: this.user?.idPerson,
            name: this.archivo.name
        }

        if (parseInt((event.target.files[0].size / 1024 / 1024).toFixed(1)) > 3.5) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'El tamaño máximo permitido es de 3.5mb',
            });
      
            return;
          } else {
            this.uploadImg(this.archivo, dto);
              }
          }

          uploadImg(file, dto){
            const formData = new FormData();
            formData.append('files', file);
            formData.append('request', JSON.stringify(dto));
             this.personService.uploadimg(formData).subscribe(res => {
                if (res.stateCode == 200) {
                    //se actualizo imagen
                    console.log('res', res);
                    this.imgPerfil = res.data.img;     
                    this.eventService.saveimg$.emit(this.imgPerfil);
                  }
             });
          }

          uploadcv(file, dto){
            const formData = new FormData();
            formData.append('files', file);
            formData.append('request', JSON.stringify(dto));
             this.personService.uploadcv(formData).subscribe(res => {
                if (res.stateCode == 200) {
                    this.personimg = res.data;
                }
             });
          }

          downLoad() {
            let link = document.createElement('a');
            let blobArchivo = this.base64ToBlob(this.personimg.archivo, this.personimg.contentType);
            let blob = new Blob([blobArchivo], { type: this.personimg.contentType })
            link.href = URL.createObjectURL(blob);
            link.download = this.personimg.name;
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

        ngOnDestroy(): void {
            this.editPerson.unsubscribe();
        }

        openProfesionalURL(url: string) {
            window.open(url, '_blank');
        }
    }
