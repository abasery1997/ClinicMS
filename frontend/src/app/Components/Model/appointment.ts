export class Appointment {
    constructor(
        public _id:string,
        public doctorID:Object,
        public employeeID:Object,
        public patientID:Object,
        public appDate:Date,
        public status:boolean,
      
    ){}
}

export class Time{
    constructor(public h:number,public m:number){}
}
