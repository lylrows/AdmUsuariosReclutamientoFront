import {
    Component,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Subject } from 'rxjs';
import { ApplicantFilter } from 'src/app/data/schema/applicant.model';
import { ApplicantService } from 'src/app/data/service/applicant.service';

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
    list: any[] = [];
    jobs: any[] = [];
    state = null;

    currentPage = 1; // seteamos a la pagina 1
    itemsPerPage = 5; // mostramos 5 registros por pagina
    totalItems = 0; // Total de registro
    showBoundaryLinks: boolean = true;
    showDirectionLinks: boolean = true;
    firstText = 'Primero';
    lastText = 'Último';
    prevText = '<';
    nextText = '>';

    applicantcount = 0;
    active: boolean = true;

    @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;

    eventsSubject: Subject<any> = new Subject<any>();

    applicantFilter: ApplicantFilter = <ApplicantFilter>{
        IdUser: 0,
        order: true,
        nid_state: 0
    };

    

    dateFilterisChecked = false;
    dateFilterCheckedName = '';

    id_user: number = 0;

    constructor(
        private _service: ApplicantService,
        private renderer: Renderer2
    ) {
        const storage = JSON.parse(localStorage.getItem('USER'));
        this.id_user = storage.id;
    }

    checkFilterList = [
      { code: 0, description: 'Todas' },
      { code: 758, description: 'No Leídas' },
      { code: 757, description: 'Leídas' },
  ];

    ngOnInit(): void {
        this.applicantFilter.IdUser = this.id_user;
        this.getList(this.applicantFilter);
        this.getListState();
        this.getListJob();
    }

    getList(filters: ApplicantFilter): void {
        this._service.getList(filters).subscribe((resp) => {
            this.list = resp.data.lista;
            this.applicantcount = resp.data.totalrecords;
            this.totalItems = resp.data.totalrecords;
        });
    }

    pageChanged(event: PageChangedEvent): void {
        this.currentPage = event.page;
        this.applicantFilter.currentPage = this.currentPage;
        this.getList(this.applicantFilter);
    }

    getListState(): void {
        this._service.getListState(this.id_user).subscribe((resp) => {
            this.state = resp;
        });
    }

    getListJob(): void {
        this._service.getListJobs(this.id_user).subscribe((resp) => {
            this.jobs = resp;
        });
    }

    OrderApplicant(order: boolean) {
        this.active = order;
        this.applicantFilter.order = order;
        this.getList(this.applicantFilter);
    }

    filterCheck(e): void {
        this.dateFilterisChecked = !this.dateFilterisChecked;
        this.dateFilterCheckedName = e.target.name;
      
      if ( this.dateFilterisChecked ) {
        this.applicantFilter.nid_state = Number(this.dateFilterCheckedName)
      } else {
        this.applicantFilter.nid_state = 0;
      }      
      this.getList(this.applicantFilter);

    }

    public scrollRight(): void {
      this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
    }
  
    public scrollLeft(): void {
      this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
    }
}
