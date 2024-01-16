import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { MessageService } from 'primeng/api';
import { JobFilter } from 'src/app/data/schema/job/jobfilter';
import { JobService } from 'src/app/data/service/job.service';
import { MasterTableService } from 'src/app/data/service/mastertable.service';
import { RecruitmentAreaService } from 'src/app/data/service/recruitmentarea.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
declare let $: any;

@Component({
    selector: 'app-job',
    templateUrl: './job.component.html',
    styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
    isShowDates: boolean = false;
    isSHowTipoPuesto: boolean = false;
    isModalidad: boolean = false;
    isPostulante: boolean = false;
    isShowempresa: boolean =true;
    companySelectedList:any[]=[];
    companySelectedOptionList:any[]=[];

    datePublicationSelectedList:any[]=[];
    rolTypeSelectedList:any[]=[];
    workModeSelectedList:any[]=[];
    discapacityModeSelectedList:any[]=[];
    maxSize: number = 10;

    classUp = 'pi pi-chevron-up';
    constructor(
        private jobService: JobService,
        private messageService: MessageService,
        private recruitmentAreaService: RecruitmentAreaService,
        private mastertableService: MasterTableService,
        private ls: LocalStoreService,
        private route: ActivatedRoute,
        private router: Router
    ) {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        this.maxSize = 3
      }
    }

    APP_USER = "USER";
    jobFilter :JobFilter =<JobFilter>{
        isFilterByJobLevel:false,
        jobLevel :0,
        isFilterByJobType :false,
        jobType  :0,
        isFilterByWorkType :false,
        workType :0


    };
    isLogged=false;
    joblist = [];
    areaList = [];
    jobLevels: any[] = [];
    categoriestype: any[] = [];
    modalityList=[];
    modalityWorkList=[];
    modalityDiscapacityList =[];
    filtertitleClass='filtertitleClass';
    jobscount =0;
    
    dateFilterList=[
        {code:0,description:'Hoy'},
        // {code:1,description:'Ayer'},
        // {code:3,description:'Menor a 3 días'},
        // {code:4,description:'Menor a 4 días'},
        {code:5,description:'Menor a 5 días'},
        // {code:6,description:'Menor a 6 días'},
        {code:10,description:'Menor a 10 días'},
        {code:15,description:'Menor a 15 días'},
        {code:30,description:'Menor a 1 mes'},
        {code:60,description:'Menor a 2 meses'},
    ];
    ShortList=[
        {code:1,description:'Relevantes'},
        {code:2,description:'Recientes'},

    ];
    CompanyList=[        
        {code:1	,description:'Campo Fe'},
        {code:2	,description:'Prestafe'},
        {code:3	,description:'Fesalud'},
        {code:4	,description:'Grupo Fe'}
    ];

    IsDiscapacityList =[        
      {code:1	,description:'Sí'},
      {code:2	,description:'No'},
  ];

    dateFilterisChecked=false;
    dateFilterCheckedName='';

    jobLevelFilterisChecked=false;
    jobLevelCheckedName='';

    modalityFilterisChecked=false;
    modalityCheckedName='';

    companyFilterisChecked=false;
    companyCheckedName='';



    modalityWorkFilterisChecked=false;
    modalityWorkCheckedName='';
    disabilityFilterIsChecked= false;
    disabilityFilterIsNoChecked= false;


    areaRecruitments = [];
    idcategory = 0 ;
    idCompany = 0;
    idjoblevel = 0;

    currentPage = 1; // seteamos a la pagina 1
    itemsPerPage = 5; // mostramos 5 registros por pagina
    totalItems = 0; // Total de registro
    showBoundaryLinks: boolean = true;
    showDirectionLinks: boolean = true;
    firstText="Primero";
    lastText="Último";  
    prevText="<";
    nextText=">"   ;
    
    ngOnInit(): void {
        if(this.getUser() !== null  && this.getUser() !== undefined ){
            this.isLogged=true;
            
          }
            let idjoblevel = sessionStorage.getItem('idlevel'); 
            
            if (idjoblevel){
              this.idjoblevel  =  parseInt(idjoblevel);
            }
            let idEmpresa = sessionStorage.getItem('idEmpresa');
            if (idEmpresa){
                this.idCompany  = parseInt( idEmpresa); 
                this.onChangeCompanyFilter(this.idCompany);
                // this.getAreas();
              
            }

            let idcategory = sessionStorage.getItem('idcategory');
            if (idcategory){
                this.idcategory  =  parseInt(idcategory);   
            }
            this.getAllJobs();

          // this.route.params.subscribe(params => {
              
          //   let idjoblevel = params['idlevel']; 
            
          //   if (idjoblevel){
          //     this.idjoblevel  =  idjoblevel;
          //   }
          //   let idEmpresa = params['idEmpresa'];
          //   if (idEmpresa){
          //       this.idCompany  = parseInt( idEmpresa); 
          //       this.onChangeCompanyFilter(this.idCompany);
          //       // this.getAreas();
              
          //   }

          //   let idcategory = params['idcategory'];
          //   if (idcategory){
          //       this.idcategory  =  idcategory;   
          //   }
          //   this.getAllJobs();
          // });
      //this.getAreas();
      this.getJobLevel();
      this.getCategoriesType();
      this.getCategories();
      this.getModality();
      this.getModalityWork();
      //this.getAllJobs();

    }

    getCategoriesType(){
      this.mastertableService.getcategoriespublic().subscribe(
        res => {
             this.categoriestype = res.data;
             console.log( this.categoriestype);
        
        }
    )
    }
       
    pageChanged(event: PageChangedEvent): void {

        this.currentPage= event.page;
        this.jobFilter.currentPage = this.currentPage;
        this.getAllJobs();
    }


    getAreas() {
       this.idcategory =0;
        this.recruitmentAreaService.getall(Number(this.idCompany)).subscribe(
            (data) => {
                if (data !== null && data !== undefined) {
                    this.areaRecruitments = data.data; 
                    // this.idCompany=parseInt(  );
                    //this.onChangeCompanyFilter(this.idCompany);
                   
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

    getJobLevel() {
      this.mastertableService.getallpublic(114).subscribe(
          res => {
               this.jobLevels = res.data;
          }
      )
  }
  getModality(){
    this.mastertableService.getallpublic(66).subscribe(
      res => {
           this.modalityList = res.data;
           console.log(this.modalityList);
      }
  )
  }
  getModalityWork(){
    this.mastertableService.getallpublic(752).subscribe(
      res => {
           this.modalityWorkList = res.data;
           
      }
  )
  }
  getUser() {
    return this.ls.getItem(this.APP_USER);
  }


    getAllJobs() {

        
        this.jobFilter.isFilterByJobLevel=true;
        this.jobFilter.jobLevel = parseInt( this.idjoblevel.toString());


        this.jobFilter.isFilterByJobType = this.modalityFilterisChecked;
        this.jobFilter.jobType = parseInt(  this.modalityCheckedName == "" ? "0" :  this.modalityCheckedName);
        this.jobFilter.jobTypes = this.rolTypeSelectedList;

        this.jobFilter.isFilterByCompany = this.companyFilterisChecked;
        this.jobFilter.company = parseInt(  this.companyCheckedName == "" ? "0" :  this.companyCheckedName);
        this.jobFilter.companys= this.companySelectedList;

        this.jobFilter.isFilterByWorkType =this.modalityWorkFilterisChecked;
        this.jobFilter.workType =  parseInt(this.modalityWorkCheckedName == "" ? "0" :this.modalityWorkCheckedName);
        this.jobFilter.workTypes = this. workModeSelectedList;


        this.jobFilter.isFilterByCreationDate =this.dateFilterisChecked;
        this.jobFilter.creationDate =  parseInt(this.dateFilterCheckedName == "" ? "0" :this.dateFilterCheckedName);
        this.jobFilter.creationDates = this.datePublicationSelectedList ;

        this.jobFilter.isdiscapacities = this.discapacityModeSelectedList ;


        this.jobFilter.isFilterByArea = true;
        this.jobFilter.idcategory = parseInt(this.idcategory.toString());

        this.jobFilter.isFilterByDisability = this.disabilityFilterIsChecked;
        this.jobFilter.isFilterByDisabilityNo = this.disabilityFilterIsNoChecked;

        // this.jobFilter.jobFilter

        

        this.jobService.getalljobs(this.jobFilter).subscribe(
            (data) => {
                if (data !== null && data !== undefined) {
                    if (data.stateCode !== 200) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: data.messageError[0],
                            life: 4000,
                        });

                        return;
                    }

                    
                    this.joblist = data.data.lista;
                    this.jobscount = data.data.totalrecords;
                    this.totalItems= data.data.totalrecords;
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
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: err.message,
                    life: 4000,
                });
            }
        );
    }
    getCategories() {
      this.recruitmentAreaService.getall(2).subscribe(
          (data) => {
              if (data !== null && data !== undefined) {
                  if (data.stateCode !== 200) {
                      this.messageService.add({
                          severity: 'error',
                          summary: 'Error',
                          detail: data.messageError[0],
                          life: 4000,
                      });

                      return;
                  }

                  
                  this.areaList = data.data;
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
              this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: err.message,
                  life: 4000,
              });
          }
      );
  }
  onChangeDateFilter(e){       
    this.dateFilterisChecked = !this.dateFilterisChecked;
    this.dateFilterCheckedName = e.target.name;

    if (e.target.checked) {
        this.datePublicationSelectedList?.push(parseInt(e.target.name));
    } else {
      let i: number = 0;
      this.datePublicationSelectedList?.forEach((item) => {
        if (parseInt(item) == parseInt(e.target.name)) {
            this.datePublicationSelectedList.splice(i, 1);
          return;
        }
        i++;
      });
    }
    
    this.getAllJobs();
  }
  
  onChangeJobLevelFilter(e){       
    this.jobLevelFilterisChecked = !this.jobLevelFilterisChecked;
    this.jobLevelCheckedName = e.target.textContent;
    this.idjoblevel = parseInt(e.target.value);
    // this.getAllJobs();
  }


  onChangeAreaFilter(e){       
    // this.jobLevelFilterisChecked = !this.jobLevelFilterisChecked;
    // this.jobLevelCheckedName = e.target.textContent;
    this.idcategory = parseInt(e.target.value);
    // this.getAllJobs();
  }

  onChangeModalityFilter(e){       
    this.modalityFilterisChecked = !this.modalityFilterisChecked;
    this.modalityCheckedName = e.target.name;

    if (e.target.checked) {
        this.rolTypeSelectedList?.push(parseInt(e.target.name));
    } else {
      let i: number = 0;
      this.rolTypeSelectedList?.forEach((item) => {
        if (parseInt(item) == parseInt(e.target.name)) {
            this.rolTypeSelectedList.splice(i, 1);
          return;
        }
        i++;
      });
    }

    this.getAllJobs();
 
  }

  
  onChangeModalityDiscapacity(e){       
 
    if (e.target.checked) {
        this.discapacityModeSelectedList?.push(e.target.name);
    } else {
      let i: number = 0;
      this.discapacityModeSelectedList?.forEach((item) => {
        if (item ==e.target.name) {
            this.discapacityModeSelectedList.splice(i, 1);
          return;
        }
        i++;
      });
    }

    this.getAllJobs();
 
  }



  onChangeCompanyFilter(e){

   if (e?.target?.tagName=="SELECT" ){ 
      this.companySelectedOptionList=[];
      if(parseInt(e.target.value) != 0){
        this.companySelectedOptionList?.push(parseInt(e.target.value) );
      }
    }

    if (e?.target?.checked  ) {
        this.companySelectedList?.push(parseInt(e.target.name) );
    }else if (  this.isNumber(e?.toString ())) {
      this.companySelectedList?.push(parseInt(e) );
    }
    else{
      let i: number = 0;
      this.companySelectedList?.forEach((item) => {
        if (parseInt(item) == parseInt(e.target.name)) {
            this.companySelectedList.splice(i, 1);
          return;
        }
        i++;
      });
    }
 
    this.companySelectedList = [...this.companySelectedList,...this.companySelectedOptionList];
    this.companySelectedList = this. companySelectedList.filter((valor, indice) => {
      return  this.companySelectedList.indexOf(valor) === indice;
    });

    // this.companySelectedList =[];
    // if (e?.target?.tagName!="SELECT" ){ 
      this.getAllJobs();
    // }
  }


  onChangeModalityWorkFilter(e){       
    this.modalityWorkFilterisChecked = !this.modalityWorkFilterisChecked;
    this.modalityWorkCheckedName = e.target.name;

    if (e.target.checked) {
        this.workModeSelectedList?.push(parseInt(e.target.name));
    } else {
      let i: number = 0;
      this.workModeSelectedList?.forEach((item) => {
        if (parseInt(item) == parseInt(e.target.name)) {
            this.workModeSelectedList.splice(i, 1);
          return;
        }
        i++;
      });
    }

    
    this.getAllJobs();
  }

  isNumber(str: string): boolean {
    if (typeof str !== 'string') {
      return false;
    }
  
    if (str.trim() === '') {
      return false;
    }
  
    return !Number.isNaN(Number(str));
  }

  onChangeDisability(e){
    this.disabilityFilterIsChecked = !this.disabilityFilterIsChecked;
    this.getAllJobs();
  }

  onChangeDisabilityNo(e){
    this.disabilityFilterIsNoChecked = !this.disabilityFilterIsNoChecked;
    this.getAllJobs();
  }

  navigate(id: any){
    sessionStorage.setItem('job', id);
    this.router.navigateByUrl('/recruitment/job-detail');
  }

}
