import { MasterTableService } from 'src/app/data/service/mastertable.service';
import { RecruitmentAreaService } from 'src/app/data/service/recruitmentarea.service';
import { PersonService } from './../../../../data/service/person.service';
import { JwtAuthService } from './../../../../shared/services/auth/jwt-auth.service';
import { Component, OnInit } from '@angular/core';
import { PersonDto } from 'src/app/data/schema/person.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-configuration',
    templateUrl: 'configuration.component.html',
    styleUrls: ['configuration.component.scss']
})

export class ConfigurationComponent implements OnInit {
    user: any;
    person: PersonDto;
    idjoblevel = 0;
    idarea = 0;
    idCompany = 0;
    areaRecruitments: any[];
    jobLevels: any;

    CompanyList=[        
        {code:1	,description:'Campo Fe'},
        {code:2	,description:'Prestafe'},
        {code:3	,description:'Fesalud'},
        {code:4	,description:'Grupo Fe'}
    ];

    constructor(private jwt: JwtAuthService, 
                private personService: PersonService,
                private recruitmentAreaService: RecruitmentAreaService,
                private mastertableService: MasterTableService,
                private router: Router) {
        this.user = this.jwt.getUser();
     }

    ngOnInit() { 
        this.loadInfoPerson(this.user?.idPerson);
        this.getJobLevel();
        // this.getAreas();
    }

    getAllJobs() {
        this.router.navigate( [`/recruitment/jobs/${this.idjoblevel}/${this.idarea}`]);
    }

    loadInfoPerson(idperson) {
        this.personService.get(idperson).subscribe(res => {
            this.person = res.data;
        })
    }

    getJobLevel() {
        this.mastertableService.getallpublic(114).subscribe(
            res => {
                 this.jobLevels = res.data;
            }
        )
    }

    getAreas() {
        this.recruitmentAreaService.getall(Number(this.idCompany)).subscribe(
            (data) => {
                if (data !== null && data !== undefined) {
                    this.areaRecruitments = data.data;
                    // setTimeout(() => {
                    //     $('select').niceSelect('update');
                        
                    // }, 1);
                }
            }
        );
    }

}