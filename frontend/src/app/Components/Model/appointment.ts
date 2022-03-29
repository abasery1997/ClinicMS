export class Appointment {
    constructor(
        public _id:Object,
        public doctorID:Object,
        public employeeID:Object,
        public patientID:Object,
        public appDate:Date,
        public status:boolean,
        public serviceId:Object
    ){}
}

export class Time{
    constructor(public h:number,public m:number){}
}
