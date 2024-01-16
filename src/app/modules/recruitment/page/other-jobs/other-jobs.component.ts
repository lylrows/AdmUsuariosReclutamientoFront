import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { JobService } from 'src/app/data/service/job.service';

@Component({
  selector: 'app-other-jobs',
  templateUrl: './other-jobs.component.html',
  styleUrls: ['./other-jobs.component.scss']
})
export class OtherJobsComponent implements OnInit {


  @Input() customtitle: string;
  @Input() idJob: number = 0;
  constructor(
    private jobService: JobService,
    private router: Router,
    private messageService: MessageService
  ) { }

  otherJobs=[];
  @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;

  ngOnInit(): void {
    this.getotherjobs();
  }

  getotherjobs(){
    console.log("idJob", this.idJob);
    this.jobService
    .getotherjobs()
    .subscribe(
        (data) => {
            if (data !== null && data !== undefined) {
                console.log('data other jobs', data);
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
                console.log("otherJobs", this.otherJobs);
                const _index = this.otherJobs.findIndex(x => x.id_job == this.idJob);
                if(_index > -1) this.otherJobs.splice(_index, 1);    
                console.log("otherJobs after splice", this.otherJobs);  
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


  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }

  redirectJob(id: any): void {
    sessionStorage.setItem('job', id);
    if (this.router.url === '/recruitment/job-detail'){
      location.reload();
    }else{
      this.router.navigateByUrl(`/recruitment/job-detail`);
    }
  }
}
