export interface DisabilityPostulantModel {
    id : number;
    idPerson: number;
    certificateFileName: string;
    certificateFolder: string;
    certificateFileBuffer: any;
    description: string;
    active: boolean;
    fileType?: string;
}