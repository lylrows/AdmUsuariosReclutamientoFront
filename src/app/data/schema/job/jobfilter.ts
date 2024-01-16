export interface JobFilter {
    isSort: boolean;
    isFilterByCreationDate: boolean;
    isFilterByJobLevel: boolean;
    isFilterByJobType: boolean;
    isFilterByCompany: boolean;
    isFilterByWorkType: boolean;
    isFilterByArea:boolean;
    isFilterByDisability:boolean;
    isFilterByDisabilityNo:boolean;


    sort: string;
    creationDate: number;
    jobLevel: number;
    jobType: number;
    company: number
    workType: number;

    creationDates:any[];
    jobLevels:any[];
    jobTypes:any[];
    companys:any[];
    workTypes:any[];
    isdiscapacities:any [];

    idcategory:number;
    currentPage:number;

}
