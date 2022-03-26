export class Invoice {
    constructor(
        private appDate:Date,
        private status:boolean,
        private patientID:string,
        private _id:string,
        private employeeID:string,
        private doctorName:string,
        private doctorId:string,
        private clinicServiceName:string,
        private clinicServiceId:string,
        private clinicServiceAmount:number,
        private invoiceAmount:number,
        private patientName:string,
        private employeeName:string,
        ){}
}