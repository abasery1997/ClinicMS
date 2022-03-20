export class Doctor {
    constructor(
        public attendingDays:string,
        public clinicServiceID:number,
        public gender:string,
        public password:string,
        public email:string,
        public birthDate:Date,
        public name:string,
        public _id:string,
        public startTime:Time,
        public endTime:any,
    ){}
}

export class Time{
    constructor(public hour:number,public min:number){}
}
