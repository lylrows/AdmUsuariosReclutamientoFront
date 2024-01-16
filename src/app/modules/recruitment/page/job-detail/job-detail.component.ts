import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { JobDetail } from 'src/app/data/schema/job/jobdetail';
import { JobService } from 'src/app/data/service/job.service';
import { UserService } from 'src/app/data/service/user.service';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {



  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private ls: LocalStoreService,
    private router: Router,
    private messageService: MessageService,
    private userService: UserService
  ) { }

  jobidparam:number=0;
  currentJob: JobDetail=<JobDetail>{stitle:''};
  APP_USER = "USER";
  isLogged=false;
  isPostulated = false;
  relatedJobs=[];
  otherJobs=[];
  postulatedDate="";
  textoHeader = "";
  ngOnInit(): void {

    debugger;
    if(this.getUser() !== null  && this.getUser() !== undefined ){
      this.isLogged=true;
      
    }

    this.getotherjobs();
    let id = sessionStorage.getItem('job');
    if (id){
      this.jobidparam  =  parseInt(id);
      this.loadJob();
    }
      // this.route.params.subscribe(params => {
      //   let id = params['id'];
        
      //   if (id){
      //     this.jobidparam  =  id;
      //     this.loadJob();
      //   }
        
      // });


  }
  loadJob(){
    if (this.jobidparam !== 0){
      this.jobService
      .getbyid(this.jobidparam)
      .subscribe(
          (data) => {
              if (data !== null && data !== undefined) {
                  console.log('detail job', data);
                  if (data.stateCode !== 200) {
                      //  this.snack.open("Código inválido", 'OK',{ duration: 4000 });
                      //  this.jwtAuth.signout();
                    return;
                  }

                  this.currentJob = data.data;
                  this.validIsJobPostulated();
                  this.getrelatedjobs();
                  //get company jobs
                  switch(data.data.idcompany) {
                    case 1://Campo Fe
                      this.textoHeader = "En el momento más difícil, usted no estará solo";
                      break;
                    case 2://Prestafe
                    this.textoHeader = "Pendiente";
                      break;
                    case 3://Fesalud
                    this.textoHeader = "Salud familiar digna al alcance de todos";
                      break;
                    case 4://Grupo Fe
                    this.textoHeader = "Contribuimos positivamente con la vida de las personas";
                      break;
                  }
              } else {
                  //  this.snack.open("Código inválido", 'OK',{ duration: 4000 });
                  //this.jwtAuth.signout();
              }
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.message,
              life: 4000
          });
          }
      );
      
    }
  }

  validIsJobPostulated(){
    

    if (this.getUser() == null){
      this.isPostulated = false;
      return;
    }
    

    this.jobService
        .isjobpostulated(this.jobidparam,this.getUser().id)
        .subscribe(
            (data) => {
              
                if (data !== null && data !== undefined) {
                  
                  if (data.stateCode !== 200) {
                      //  this.snack.open("Código inválido", 'OK',{ duration: 4000 });
                      //  this.jwtAuth.signout();
                    return;
                  }
                  this.isPostulated = data.data.isPostulated;

                  if(this.isPostulated ){
                   this.postulatedDate = data.data.datePostulated;
                  }
                    

                } 
            },
            (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: err.message,
                life: 4000
            });
            }
        );
  }

  getUser() {
    return this.ls.getItem(this.APP_USER);
  }

  applyjob(){

    if (this.isLogged == false){
      this.router.navigateByUrl("/auth/login");
      return;
    }

    this.jobService
    .addjobpostulant({
      "id_job":this.currentJob.id_job,
      "id_postulant":this.getUser().id
    })
    .subscribe(
        (data) => {
          
            if (data !== null && data !== undefined) {
              
                if (data.stateCode === 100) {
                    this.messageService.add({
                      severity: 'info',
                      summary: 'Validación',
                      detail: data.messageError[0],
                      life: 4000
                  });

                  return;
                }
                else if (data.stateCode !== 100 && data.stateCode !== 200) {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: data.messageError[0],
                    life: 4000
                });

                return;
              }

                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: data.messageError[0],
                  life: 4000
                });
                this.sendMailPostulantConfirmation();
                this.validIsJobPostulated();
                this.isPostulated=true;
                
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Ocurrió un error ',
                life: 4000
            });
            }
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.message,
            life: 4000
        });
        }
    );

  }


  getrelatedjobs(){

    this.jobService
    .getrelatedjobs(this.currentJob.id_job)
    .subscribe(
        (data) => {
            if (data !== null && data !== undefined) {
              
                if (data.stateCode !== 200) {
                    this.messageService.add({
                      severity: 'error',
                      summary: 'Error',
                      detail: data.messageError[0],
                      life: 4000
                  });

                  return;
                }

                this.relatedJobs = data.data;
                
                
                
                
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Ocurrió un error ',
                life: 4000
            });
            }
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.message,
            life: 4000
        });
        }
    );
  }
 
  getotherjobs(){

    this.jobService
    .getotherjobs()
    .subscribe(
        (data) => {
            if (data !== null && data !== undefined) {
              
                if (data.stateCode !== 200) {
                    this.messageService.add({
                      severity: 'error',
                      summary: 'Error',
                      detail: data.messageError[0],
                      life: 4000
                  });

                  return;
                }

                this.otherJobs = data.data;
                
                
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Ocurrió un error ',
                life: 4000
            });
            }
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.message,
            life: 4000
        });
        }
    );
  }

  goLogin(){
    sessionStorage.setItem('job', this.jobidparam.toString());
    this.router.navigateByUrl("/auth/login");
  }
  goRegister(){
    this.router.navigateByUrl("/#/register");
  }
  sendMailPostulantConfirmation() {
    this.userService.sendMailPostulantConfirmation(this.getUser().email,this.currentJob.stitle).subscribe(
        res => {
            if (res.stateCode == 200) {
              this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'Se envio el mensaje correctamente',
                  life: 4000
              });
            } else {
              this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: res.messageError[0],
                  life: 4000
              });
            }
        }
    )
  }

  navigate(id: any){
    sessionStorage.setItem('job', id);
    location.reload();
  }
}
