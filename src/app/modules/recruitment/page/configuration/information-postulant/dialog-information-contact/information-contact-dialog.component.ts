import { UtilsService } from './../../../../../../data/service/utils.service';
import { MessageService } from 'primeng/api';
import { PersonService } from './../../../../../../data/service/person.service';
import { PersonDto } from 'src/app/data/schema/person.model';
import { InformationPostulantEventService } from './../information-postulant-event.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-information-contact-dialog',
    templateUrl: 'information-contact-dialog.component.html',
    styleUrls: ['information-contact-dialog.component.scss'],
})
export class InformationContactDialogComponent implements OnInit {
    title?: string;
    closeBtnName?: string;
    list: PersonDto;
    form: FormGroup;
    idperson: number;
    lstDepartament: any[] = [];
    lstProvince: any[] = [];
    lstDistrict: any[] = [];

    constructor(
        public bsModalRef: BsModalRef,
        private fb: FormBuilder,
        private eventService: InformationPostulantEventService,
        private personService: PersonService,
        private messageService: MessageService,
        private utilsService: UtilsService
    ) {}

    ngOnInit() {
        this.buildFormGroup(this.list);
        this.loadDepartament();
        this.loadProvince(this.list.idDepartmentLocation);
        this.loadDistrict(this.list.idProvinceLocation);
    }

    buildFormGroup(data) {
        this.form = this.fb.group({
            id: [data.id || null],
            cellPhone: [data.cellPhone || '', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9)])],
            anotherPhone: [data.anotherPhone || null],
            iddeparment: [
                data.idDepartmentLocation || null,
                Validators.required,
            ],
            idprovince: [data.idProvinceLocation || null, Validators.required],
            iddistrito: [data.idDistrictLocation || null, Validators.required],
            address: [data.address || null, Validators.required],
            email: [data.email || '', Validators.compose([Validators.required, Validators.email])],
            urlProfesional: [data.urlProfesional || '']
        });
    }

    valideKey(evt) {
        // code is the decimal ASCII representation of the pressed key.
        var code = evt.which ? evt.which : evt.keyCode;

        if (code == 8) {
            // backspace.
            return true;
        } else if (code >= 48 && code <= 57) {
            // is a number.
            return true;
        } else {
            // other keys.
            return false;
        }
    }

    loadDepartament() {
        this.utilsService.getDepartament().subscribe((res) => {
            this.lstDepartament = res.data;
        });
    }

    changeProv(event) {
        this.form.controls['idprovince'].setValue(null);
        this.form.controls['iddistrito'].setValue(null);
        this.loadProvince(event.target.value);
        this.lstDistrict=[];
    }

    changeDis(event) {
        this.form.controls['iddistrito'].setValue(null);
        this.loadDistrict(event.target.value);
    }

    loadProvince(id) {
        this.utilsService.getprovince(id).subscribe((res) => {
            this.lstProvince = res.data;
        });
    }

    loadDistrict(id) {
        this.utilsService.getdistrict(id).subscribe((res) => {
            this.lstDistrict = res.data;
            // this.form.controls['iddistrito'].setValue(null);
        });
    }

    submit() {
        let dto: PersonDto = {
            id: this.form.get('id').value,
            cellPhone: this.form.get('cellPhone').value,
            anotherPhone: this.form.get('anotherPhone').value,
            address: this.form.get('address').value,
            email: this.form.get('email').value,
            idDistrictLocation: parseFloat(this.form.get('iddistrito').value),
            idProvinceLocation: parseFloat(this.form.get('idprovince').value),
            urlProfesional: this.form.get('urlProfesional').value,
            idDepartmentLocation: parseFloat(
                this.form.get('iddeparment').value
            ),
        };
        this.personService.updateInformationContact(dto).subscribe((res) => {
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

