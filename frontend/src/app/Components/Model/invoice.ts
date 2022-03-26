export class Invoice {
    constructor(
        public appDate:Date,
        public status:boolean,
        public patientID:string,
        public _id:string,
        public employeeID:string,
        public doctorFirstName:string,
        public doctorId:string,
        public clinicServiceName:string,
        public clinicServiceId:string,
        public clinicServiceAmount:number,
        public patientFirstName:string,
        public employeeName:string,
        ){}
}