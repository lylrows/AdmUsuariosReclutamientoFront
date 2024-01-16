// import { UserService } from './../../../../data/service/user.service';
//import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RecruitmentAreaService } from 'src/app/data/service/recruitmentarea.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MasterTableService } from 'src/app/data/service/mastertable.service';
import { Router } from '@angular/router';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { environment } from 'src/environments/environment';
declare let $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit,AfterViewInit  {
    areaRecruitments = [];
    isLogged=false;
    form: FormGroup;

    areas = [];
    otherJobs=[];
    jobLevels: any[] = [];
    categories: any[] = [];

    APP_USER = "USER";
    
    CompanyList=[        
        {code:1	,description:'Campo Fe'},
        {code:2	,description:'Prestafe'},
        {code:3	,description:'Fesalud'},
        {code:4	,description:'Grupo Fe'}
    ];

    constructor(
        private ls: LocalStoreService,
        //private route: ActivatedRoute,
        //private userService: UserService,
        private recruitmentAreaService: RecruitmentAreaService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private mastertableService: MasterTableService,
        private router: Router  
    ) {
        //clearInterval();
        // window.location.reload();
        let storage = sessionStorage.getItem('job');
        console.log("🚀 ~ fHomeComponent ~ storage:", storage)
        if (storage != null) {
            window.location.href = `${environment.localhost}#/recruitment/job-detail/${storage}`;
        }
    }
    ngAfterViewInit() {
        // ...

      
                //  $('#inputState').niceSelect();

    }

    ngOnInit(): void {
        if(this.getUser() !== null  && this.getUser() !== undefined ){
                this.isLogged=true;
                // this.fullnameuser= this.getUser().displayName;
            // this.img = this.getUser().img;
          }

        this.buildForm();
        
        this.getJobLevel();
        this.getCategories();
        // this.getAreas();
        this.clear();
        
     
    }

    getUser() {
        return this.ls.getItem(this.APP_USER);
      }

    buildForm() {
        this.form = this.fb.group({
            
            idcategory: [0],
            idEmpresa: [0],
            idlevel: [0],
        });
    }

 
  
  


    getJobLevel() {
        
        this.mastertableService.getallpublic(114).subscribe(
            res => {
                 this.jobLevels = res.data;
                 console.log( this.jobLevels);
            
            }
        )
    }
    getCategories() {
        
        this.mastertableService.getcategoriespublic().subscribe(
            res => {
                 this.categories = res.data;
                 console.log( this.categories);
            
            }
        )
    }

    getAreas() {
        this.recruitmentAreaService.getall(Number(this.form.get('idEmpresa').value)).subscribe(
            (data) => {
                if (data !== null && data !== undefined) {
                    this.areaRecruitments = data.data; 
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Ocurrió un error ',
                        life: 4000,
                    });
                }
            },
            (err) => {
                console.log('error');
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: err.message,
                    life: 4000,
                });
            }
        );
    }

    // getAreas() {

        
    //     this.recruitmentAreaService.getall(2).subscribe(
    //         (data) => {
    //             if (data !== null && data !== undefined) {
    //                 this.areaRecruitments = data.data;
                  
                  
    //             } else {
    //                 // this.messageService.add({
    //                 //     severity: 'error',
    //                 //     summary: 'Error',
    //                 //     detail: 'Ocurrió un error ',
    //                 //     life: 4000,
    //                 // });
    //                 console.log("Ocurriò un error al obtener las áreas");
                    
    //             }

              
    //         },
    //         (err) => {
    //             console.log(err.message);
    //             // this.messageService.add({
    //             //     severity: 'error',
    //             //     summary: 'Error',
    //             //     detail: err.message,
    //             //     life: 4000,
    //             // });
    //         }
    //     );
    // }

    submit() {
        sessionStorage.setItem('idcategory',this.form.controls['idcategory'].value);
        sessionStorage.setItem('idEmpresa',this.form.controls['idEmpresa'].value);
        this.router.navigate( [`/recruitment/jobs`]);    
    }
    clear() {
        const interval_id = window.setInterval(function () {},
        Number.MAX_SAFE_INTEGER);
  
        // Clear any timeout/interval up to that id
        for (let i = 1; i < interval_id; i++) {
            window.clearInterval(i);
        }
      }
}
