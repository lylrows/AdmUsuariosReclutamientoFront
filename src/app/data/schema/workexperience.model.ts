export interface WorkExperienceModel {
    id: number;
    idPerson: number;
    company: string;
    idActivity: number;
    stand: string;
    idExperienceLevel: number;
    idPositionArea: number;
    // idSubArea: number;
    subArea: number;
    idCountry: number;
    monthStart: string;
    yearStart: string;
    monthEnd: string;
    yearEnd: string;
    descriptionResponsabilities: string;
    idPeopleCharge: number;
    salary:string;
    active: boolean;
    present: boolean;
}