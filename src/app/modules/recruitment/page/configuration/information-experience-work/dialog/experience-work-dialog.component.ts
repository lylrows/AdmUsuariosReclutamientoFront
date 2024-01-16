import { CountryService } from './../../../../../../data/service/country.service';
import { ExperienceWorkEventService } from './../experience-work-event.service';
import { MasterTableService } from './../../../../../../data/service/mastertable.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MessageService } from 'primeng/api';
import { WorkExperienceService } from 'src/app/data/service/work-experience.service';
import { WorkExperienceModel } from 'src/app/data/schema/workexperience.model';
import { CountryModel } from 'src/app/data/schema/country.model';
import { createMask, InputmaskOptions } from '@ngneat/input-mask';
// import { NgxMaskModule, IConfig } from 'ngx-mask'
// export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { DecimalPipe } from '@angular/common';

      // First, you need to create the `numberMask` with your desired configurations

@Component({
    selector: 'app-experience-work-dialog',
    templateUrl: 'experience-work-dialog.component.html',
    styleUrls: ['experience-work-dialog.component.scss'],
    // directives: [MaskedInput]
})

export class ExperienceWorkDialogComponent implements OnInit {
    @Input() inputMask!: InputmaskOptions<any>;
    private numberMask = createNumberMask({ thousandsSeparatorSymbol: '.', allowDecimal: true, decimalSymbol: ',' })
 
    value ="";
    dateInputMask = createMask<Date>({
        alias: 'datetime',
        inputFormat: 'dd/mm/yyyy',
        parser: (value: string) => {
          const values = value.split('/');
          const year = +values[2];
          const month = +values[1] - 1;
          const date = +values[0];
          return new Date(year, month, date);
        },
      });
      
 
      dateInputMaskCustom = createMask<Date>({
        alias: 'datetime',
        inputFormat: 'dd/mm/yyyy',
        parser: (value: string) => {
          const values = value.split('/');
          const year = +values[2];
          const month = +values[1] - 1;
          const date = +values[0];
          return new Date(year, month, date);
        },
      });
      currencyInputMask = createMask({
        alias: 'numeric',
        groupSeparator: ',',
        digits: 2,
        digitsOptional: false,
        prefix: 'S/ ',
        min: 0,
        max: 99999,
        placeholder: "0.00",
      });
      licensePlateInputMask = createMask('[9-]AAA-999');

      
      
    title?: string;
    closeBtnName?: string;
    list: any;
    form: FormGroup;
    idperson: number;
    valor: number = 1;
    lstNivelExperiencia: any[] = [];
    lstIndustries: any[] = [];
    lstareapuesto: any[] = [];
    lstyearsini: any[] = [];
    lstmonthini: any[] = [];
    lstyearsfin: any[] = [];
    lstmonthfin: any[] = [];
    lstCountry: CountryModel[] = [];
    lstsubarea: any[] = [];
    years: any[] = [];
    month: any[] = [];
    remainterText=5000;
    editorOptions= {
        toolbar: [
          [{ 'list': 'bullet' }],
          [ 'bold', 'italic', 'underline'],
        ],
      };
      
    constructor(
        public bsModalRef: BsModalRef,
        private messageService: MessageService,
        private fb: FormBuilder,
        private mastertableService: MasterTableService,
        private workEsperienceService: WorkExperienceService,
        private eventService: ExperienceWorkEventService,
        private countryService: CountryService,
        private decimalPipe: DecimalPipe
    ) {
     }

     onBlur(event){
        if(event.target.value !== '')
         event.target.value = parseFloat(event.target.value).toFixed(2)
        }

    ngOnInit() { 



        this.years = this.workEsperienceService.years;
        this.month = this.workEsperienceService.month;
        this.lstyearsini = this.workEsperienceService.years;
        this.lstmonthini = this.workEsperienceService.month;
        this.lstyearsfin = this.workEsperienceService.years;
        this.lstmonthfin = this.workEsperienceService.month;
        this.buildFormGroup(this.list);
        this.loadNivelExperiencia();
        this.loadIndustries();
        this.loadAreaPuesto();
        this.loadCountry();
    }

    changeYearIni($event) {
        
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


    buildFormGroup(data) {
        this.form = this.fb.group({
            id: [data.id || null],
            company: [data.company || '', Validators.required],
            idActivity: [data.idActivity || null],//, Validators.required
            stand: [data.stand || '', Validators.required],
            idExperienceLevel: [data.idExperienceLevel || null],//, Validators.required
            idPositionArea: [data.idPositionArea || null, Validators.required],
            // idSubArea: [data.idSubArea || null, Validators.required],//subArea
            subArea: [data.subArea || null, Validators.required],//subArea
            idCountry: [data.idCountry || null],//, Validators.required
            monthStart: [data.monthStart || '', Validators.required],
            yearStart: [data.yearStart || '', Validators.required],
            monthEnd: [data.monthEnd || '', Validators.required],
            yearEnd: [data.yearEnd || '', Validators.required],
            descriptionResponsabilities: [data.descriptionResponsabilities || '', Validators.required],
            idPeopleCharge: [data.idPeopleCharge || null, Validators.min(1)],
            salary:[data.salary || null],
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

         
        if (data.idPositionArea != null) {
            this.mastertableService.get(data.idPositionArea).subscribe(res => {
                this.lstsubarea = res.data;
            })
        }
    }

    loadCountry() {
        this.countryService.get().subscribe(
            res => {
                this.lstCountry = res.data;
            }
        )
    }

    loadNivelExperiencia() {
        this.mastertableService.get(114).subscribe(res => {
            this.lstNivelExperiencia = res.data;
        })
    }

    changeArea(event) {
        this.mastertableService.get(event.target.value).subscribe(res => {
            this.lstsubarea = res.data.sort((a, b) => a.descriptionValue.localeCompare(b.descriptionValue));
        })
    }

    loadIndustries() {
        this.mastertableService.get(119).subscribe(res => {
            this.lstIndustries = res.data.sort((a, b) => a.descriptionValue.localeCompare(b.descriptionValue));
        })
    }

    loadAreaPuesto() {
        this.mastertableService.get(192).subscribe(res => {
            this.lstareapuesto = res.data.sort((a, b) => a.descriptionValue.localeCompare(b.descriptionValue));
        })
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
        const dto : WorkExperienceModel = {
            id: this.form.get('id').value,
            company: this.form.get('company').value,
            idActivity: parseFloat(this.form.get('idActivity').value)||0,
            idCountry: parseFloat(this.form.get('idCountry').value)||0,
            idExperienceLevel: parseFloat(this.form.get('idExperienceLevel').value) || 0,
            idPerson: this.form.get('idPerson').value,
            idPositionArea: parseFloat(this.form.get('idPositionArea').value),
            // idSubArea: parseFloat(this.form.get('idSubArea').value),
            subArea: this.form.get('subArea').value,
            stand: this.form.get('stand').value,
            descriptionResponsabilities: this.form.get('descriptionResponsabilities').value,
            idPeopleCharge: parseFloat(this.form.get('idPeopleCharge').value),
            salary:  this.formatSalario(this.form.get('salary').value),
            yearEnd: this.form.get('yearEnd').value,
            yearStart: this.form.get('yearStart').value,
            monthEnd: this.form.get('monthEnd').value,
            monthStart: this.form.get('monthStart').value,
            active: true,
            present:  this.form.get('present').value
        };
        
       if (dto.id == null) {
            this.workEsperienceService.add(dto).subscribe((res) => {
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
            this.workEsperienceService.update(dto).subscribe((res) => {
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

      valideKey(evt) {
        // code is the decimal ASCII representation of the pressed key.
        var code = evt.which ? evt.which : evt.keyCode;
    
        if (code == 8 || code == 46) {
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

      formatSalario(valor): string {
        if (valor == '') return '0';
        if (valor == null) return '0';
        if (typeof valor == 'undefined') return '0';
        return valor;
      }
}