export interface InformationEducationModel {
    id: number;
    idPerson: number;
    carreer: string;
    idCountry: number;
    country?: string;
    idTypeStudy: number;
    idAreaStudy: number;
    idInstitution: number;
    otherInstitution:string;
    institution?: string;
    idState: number;
    monthStart: string;
    yearStart: string;
    monthEnd: string;
    yearEnd: string;
    active: boolean;
    present: boolean;
}
