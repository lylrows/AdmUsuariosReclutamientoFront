
export interface PersonDto {
    id: number;
    codPerson?: string;
    firstName?: string;
    secondName?: string;
    lastName?: string;
    motherLastName?: string;
    email?: string;
    idSex?: number;
    sex?: string;
    bloodType?: string;
    passport?: string;
    birthDate?: string;
    idNationality?: number;
    nationality?: string;
    idCivilStatus?: number;
    civilStatus?: string;
    isNoDomiciled?: boolean;
    drivingLicense?: string;
    universityGraduationDate?: string | null;
    countryentryDate?: string | null;
    medicalStaff?: string;
    idActive?: number;
    img?: string;
    cvFolder?: string;
    cvName?: string;
    cvFile?: any;
    contentType?: string;
    address?: string;
    idDistrict?: number;
    haveDriverLicense?: boolean;
    licenceDrive?:string;
    haveOwnMobility?: boolean;
    cellPhone?: string;
    anotherPhone?: string;
    idTypeDocument?: number;
    typeDocument?: string;
    documentNumber?: string;
    idDistrictLocation?: number;
    idProvinceLocation?: number;
    idDepartmentLocation?: number;
    urlProfesional?: string;
}
