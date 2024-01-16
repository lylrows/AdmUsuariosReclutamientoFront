import { YearsBirthDb } from './../../../../../../data/mocks/years-birth';
import { DaysDb } from './../../../../../../data/mocks/days';
import { MonthDb } from './../../../../../../data/mocks/months';
import { YearsDb } from './../../../../../../data/mocks/years';
import { MessageService } from 'primeng/api';
import { InformationPostulantEventService } from './../information-postulant-event.service';
import { PersonDto } from 'src/app/data/schema/person.model';
import { PersonService } from './../../../../../../data/service/person.service';
import { CountryService } from './../../../../../../data/service/country.service';
import { MasterTableService } from './../../../../../../data/service/mastertable.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { createMask, InputmaskOptions } from '@ngneat/input-mask';

@Component({
    selector: 'app-dialog-information-personal',
    templateUrl: 'dialog-information-personal.component.html',
    styleUrls: ['dialog-information-personal.component.scss']
})

export class DialogInformationPersonalComponent implements OnInit {
    title?: string;
    closeBtnName?: string;
    list: PersonDto;
    form: FormGroup;
    idperson: number;
    lstCountry: any[] = [];
    lstGender: any[] = [];
    lstCivilStatus:any[] = [];
    lsttypedoc: any[] = [];
    lstDays: any[] = [];
    lstMonth: any[] = [];
    lstYear: any[] = [];
    enabled = false;
    private unsubscribe$ = new Subject<void>();
    getValidarCheckSubscription: any;

    day: any;
    month: any;
    year: any;
    

    constructor(public bsModalRef: BsModalRef, 
                private fb: FormBuilder, 
                private mastertableService: MasterTableService,
                private countryService: CountryService,
                private personService: PersonService,
                private _change: ChangeDetectorRef,
                private eventService: InformationPostulantEventService,
                private messageService: MessageService) { }

    ngOnInit() { 
        this.buildFormGroup(this.list);
        this.loadCountry(8);
        this.loadGender(7);
        this.loadCivilStatus(9);
        this.loadTypeDoc(50);
        var year = new YearsBirthDb();
        this.lstYear = year.years;

        var month = new MonthDb();
        this.lstMonth = month.month;

        var days = new DaysDb();
        this.lstDays = days.day;
    }

    
    private licenceDriveValidators = [
        Validators.maxLength(10),
        Validators.minLength(3)//,
       // Validators.pattern(/.+@.+\..+/)
    ];

    buildFormGroup(data) {

        data.haveDriverLicense?this.enabled=true:this.enabled=false;

        this.parsearFecha();
        this.form = this.fb.group({
            id: [data.id || null],
            firstName: [data.firstName || '', Validators.required],
            lastName: [data.lastName || null, Validators.required],
            motherLastName: [data.motherLastName || null, Validators.required],
            idNationality: [data.idNationality || null, Validators.required],
            day: [parseInt(this.day ) || null],
            month: [this.month || null],
            year: [this.year || null],
            idCivilStatus: [data.idCivilStatus || null, Validators.required],
            idTypeDocument: [data.idTypeDocument || null, Validators.required],
            documentNumber: [data.documentNumber || '', Validators.required],
            idSex: [data.idSex || null, Validators.required],
            haveDriverLicense: [data.haveDriverLicense || false],
            licenceDrive :[data.licenceDrive || ''],//, Validators.required
            haveOwnMobility: [data.haveOwnMobility || false],
        });

        if(data.licenceDrive){
            this.enabled=true;
            this.form.get('licenceDrive').setValidators(this.licenceDriveValidators.concat( Validators.required, Validators.maxLength(10),Validators.minLength(7),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')));
        }

        this.form.get('haveDriverLicense')
        .valueChanges
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(value => {
          this.getValidarCheckSubscription = undefined;
          if(value) {
                this.enabled=true;
                this.form.get('licenceDrive').setValidators(this.licenceDriveValidators.concat( Validators.required, Validators.maxLength(10),Validators.minLength(7),Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')));
            } else {
                this.enabled=false;
                this.form.get('licenceDrive').clearValidators();
                this.form.patchValue({ licenceDrive: "" });
            }
            this._change.markForCheck();
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

    parsearFecha() {
        if (this.list.birthDate != null) {
            let arr = this.list.birthDate.split('/');
            this.day = arr[0];
            this.month = parseFloat(arr[1]);
            this.year = arr[2];
        } else {
            this.day = null;
            this.month = null;
            this.year = null;
        }
        //console.log(day, month, year);
    }

    loadTypeDoc(type) {
        this.mastertableService.get(type).subscribe(res => {
            this.lsttypedoc = res.data;
        })
    }

    loadCountry(type) {
        // this.countryService.get().subscribe(res => {
        //   this.lstCountry = res.data;
        // })
        this.mastertableService.get(type).subscribe(res => {
            this.lstCountry = res.data;
        })
    }

    loadGender(type) {
        this.mastertableService.get(type).subscribe(res => {
            this.lstGender = res.data;
        })
    }

    loadCivilStatus(type) {
        this.mastertableService.get(type).subscribe(res => {
            this.lstCivilStatus = res.data;
        })
    }

    submit(){
        let dto: PersonDto = {
            id: this.form.get('id').value,
            firstName: this.form.get('firstName').value,
            lastName: this.form.get('lastName').value,
            motherLastName : this.form.get('motherLastName').value,
            idNationality: parseFloat(this.form.get('idNationality').value),
            birthDate: this.formatFecha(),
            idCivilStatus: parseFloat(this.form.get('idCivilStatus').value),
            idTypeDocument: parseFloat(this.form.get('idTypeDocument').value),
            documentNumber: this.form.get('documentNumber').value,
            idSex: parseFloat(this.form.get('idSex').value),
            haveDriverLicense: this.form.get('haveDriverLicense').value,
            //licenceDrive
            licenceDrive: this.form.get('licenceDrive').value,
            haveOwnMobility: this.form.get('haveOwnMobility').value
        }
        this.personService.updateInformationPersonal(dto).subscribe(res => {
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
        })
    }

    formatFecha() {
        let day= this.form.get('day').value;
        let month = this.form.get('month').value;
        let year = this.form.get('year').value;

        return day + '/' + month + '/' + year;
    }
}