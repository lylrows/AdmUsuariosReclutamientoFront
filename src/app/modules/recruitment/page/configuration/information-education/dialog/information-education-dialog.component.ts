import { CountryService } from './../../../../../../data/service/country.service';
import { MasterTableService } from './../../../../../../data/service/mastertable.service';
import { InformationEducationModel } from './../../../../../../data/schema/informationEducation.model';
import { EducationPostulantService } from './../../../../../../data/service/education-postulant.service';
import { InformationEducationEventService } from './../information-education-event.service';
import { LanguagePostulantService } from './../../../../../../data/service/language-postulant.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    ValidationErrors,
} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { CountryModel } from 'src/app/data/schema/country.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-information-education-dialog',
    templateUrl: 'information-education-dialog.component.html',
    styleUrls: ['information-education-dialog.component.scss']
})
export class InformationEducationDialogComponent implements OnInit {
    title?: string;
    isNew?: boolean;
    closeBtnName?: string;
    list: any;
    form: FormGroup;
    idperson: number;
    valor: number = 1;
    lstTypeStudy: any[] = [];
    lstState: any[] = [];
    lstAreaStudy: any[] = [];
    lstInstituciones: any[] = [];
    lstyearsini: any[] = [];
    lstmonthini: any[] = [];
    lstyearsfin: any[] = [];
    lstmonthfin: any[] = [];
    lstCountry: CountryModel[] = [];
    lstCountryFilter: CountryModel[] = [];
    selectedCountry: string;
    years: any[] = [];
    month: any[] = [];

    enabled = false;
    private unsubscribe$ = new Subject<void>();
    getValidarCheckSubscription: any;

    constructor(
        public bsModalRef: BsModalRef,
        private educationPostulatService: EducationPostulantService,
        private eventService: InformationEducationEventService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private _change: ChangeDetectorRef,
        private mastertableService: MasterTableService,
        private countryService: CountryService
    ) {}

    ngOnInit() {
        this.years = this.educationPostulatService.years;
        this.month = this.educationPostulatService.month;
        this.lstyearsini = this.educationPostulatService.years;
        this.lstmonthini = this.educationPostulatService.month;
        this.lstyearsfin = this.educationPostulatService.years;
        this.lstmonthfin = this.educationPostulatService.month;
        this.buildFormGroup(this.list);
        // this.getType(64);  change 932
        this.getType(932);

        // this.getType(102);
        this.getEstadoEstudios(110);
        this.getAreaStudio(216);
        this.getInstituciones(368);
        this.loadCountry();

    }


    private otherInstitutionValidators = [
        Validators.maxLength(50),
        Validators.minLength(3)//,
       // Validators.pattern(/.+@.+\..+/)
    ];

    buildFormGroup(data) {
   
        (data.idInstitution==0) ?this.enabled=true:this.enabled=false;

        this.form = this.fb.group({
            id: [data.id || null],
            carreer: [data.carreer || '', Validators.required],
            idCountry: [data.idCountry || null, Validators.required],
            idTypeStudy: [data.idTypeStudy || null, Validators.required],
            idAreaStudy: [data.idAreaStudy || null, Validators.required],
            idInstitution: [data.idInstitution || ( this.isNew?null:0), Validators.required],
            otherInstitution: [data.otherInstitution || null, Validators.required],
            idState: [data.idState || null, Validators.required],
            monthStart: [data.monthStart || '', Validators.required],
            yearStart: [data.yearStart || '', Validators.required],
            monthEnd: [data.monthEnd || '', Validators.required],
            yearEnd: [data.yearEnd || '', Validators.required],
            present: [data.present || false],
            idPerson: [this.idperson, Validators.required],
        });

        if (data.present == true) {
            this.form.get('yearEnd').disable();
            this.form.get('monthEnd').disable();
        } else {
            this.form.get('yearEnd').enable();
            this.form.get('monthEnd').enable();
        }

        if(data.idInstitution=="0"){
            this.enabled=true;
            this.form.get('otherInstitution').setValidators(this.otherInstitutionValidators.concat( Validators.required));
        }
 

        this.form.get('idInstitution')
        .valueChanges
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(value => {
          this.getValidarCheckSubscription = undefined;
          if(value === "0") {
                this.enabled=true;
                this.form.get('otherInstitution').setValidators(this.otherInstitutionValidators.concat( Validators.required));
            } else {
                this.enabled=false;
                this.form.get('otherInstitution').clearValidators();
                this.form.patchValue({ otherInstitution: "" });
            }
            this._change.markForCheck();
        });

    }


    changeYearIni($event) {
        console.log($event.target.value);
        this.lstyearsfin = this.years;
        this.lstyearsfin = this.lstyearsfin.filter(x => x.year >= $event.target.value);
    }

    changeYearFin($event) {
        if (this.form.get('yearStart').value == $event.target.value) {
            let month = this.month.find(x => x.description == this.form.get('monthStart').value);
            this.lstmonthfin = this.month;
            this.lstmonthfin = this.month.filter(x => x.id > month.id);
        } else {
            this.lstmonthfin = this.month;
        }
    }

    changeMonth($event) {
       
    }

    getEstadoEstudios(idType) {
        this.mastertableService.get(idType).subscribe((res) => {
            this.lstState = res.data;
        });
    }

    getType(idType) {
        this.mastertableService.get(idType).subscribe((res) => {
            this.lstTypeStudy = res.data;
        });
    }

    getAreaStudio(idType) {
        this.mastertableService.get(idType).subscribe((res) => {
            this.lstAreaStudy = res.data;
        });
    }

    getInstituciones(idType) {
        this.mastertableService.get(idType).subscribe((res) => {
            let obj={
                id:"0",
                descriptionValue:"OTROS"
            };
            res.data.splice(0,0,obj);
            this.lstInstituciones = res.data;
        });
    }

    loadCountry() {
        this.countryService.get().subscribe(
            res => {
                this.lstCountry = res.data;
                this.lstCountryFilter = res.data;
            }
        )
    }

    eventChange(event) {
        let checked = event.target.checked;
        if (checked == true) {
            this.form.get('present').setValue(true);
            this.form.get('yearEnd').disable();
            this.form.get('monthEnd').disable();
            this.form.get('yearEnd').setValue("");
            this.form.get('monthEnd').setValue("");
        } else {
            this.form.get('present').setValue(false);
            this.form.get('yearEnd').enable();
            this.form.get('monthEnd').enable();
        }
    }

    lettersOnly(event) {
        //if (event.charCode > 32 && event.charCode < 65 || event.charCode > 90 && event.charCode < 97 || event.charCode > 122) return false;
        if (event.charCode == 32
            ||
            event.charCode >= 65 && event.charCode <= 90
            ||
            event.charCode >= 97 && event.charCode <= 122
            ||
            event.charCode == 130
            ||
            event.charCode == 144
            ||
            event.charCode == 181
            ||
            event.charCode == 214
            ||
            event.charCode == "0241"    // ñ Minuscula
            ||
            event.charCode == "0209"    // Ñ Mayuscula
            ||
            event.charCode == "225"     // á Minuscula
            ||
            event.charCode == "233"     // é Minuscula
            ||
            event.charCode == "237"     // í Minuscula
            ||
            event.charCode == "243"     // ó Minuscula
            ||
            event.charCode == "250"     // ú Minuscula
            ||
            event.charCode == "0193"    // A Mayuscula
            ||
            event.charCode == "0201"    // E Mayuscula
            ||
            event.charCode == "0205"    // I Mayuscula
            ||
            event.charCode == "0211"    // O Mayuscula
            ||
            event.charCode == "0218"    // U Mayuscula
        ) {
            return true;
        }
        else {
            return false;
        }
      }


    submit() {
        const dto: InformationEducationModel = {
            id: this.form.get('id').value,
            carreer: this.form.get('carreer').value,
            idCountry: parseFloat(this.form.get('idCountry').value),
            idAreaStudy: parseFloat(this.form.get('idAreaStudy').value),
            idInstitution: parseFloat(this.form.get('idInstitution').value),
            otherInstitution: this.form.get('otherInstitution').value,
            idPerson: this.form.get('idPerson').value,
            idState: parseFloat(this.form.get('idState').value),
            idTypeStudy: parseFloat(this.form.get('idTypeStudy').value),
            yearEnd: this.form.get('yearEnd').value,
            yearStart: this.form.get('yearStart').value,
            monthEnd: this.form.get('monthEnd').value,
            monthStart: this.form.get('monthStart').value,
            active: true,
            present:  this.form.get('present').value
        };
        console.log(dto);
        if (dto.id == null) {
            this.educationPostulatService.add(dto).subscribe((res) => {
                if (res.stateCode == 200) {
                    this.eventService.saveInformation$.emit(true);
                    this.bsModalRef.hide();
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: res.messageError[0],
                    });
                }
            });
        } else {
            this.educationPostulatService.update(dto).subscribe((res) => {
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
    getFormValidationErrors() {
        Object.keys(this.form.controls).forEach(key => {
          const controlErrors: ValidationErrors = this.form.get(key).errors;
          if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
             console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
            });
          }
        });
      }
}
