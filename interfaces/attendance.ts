export enum AttendancePeriod {
    Morning = 'AM',
    Evening = 'PM',
}

export enum AttendanceRecordEnum {
    P = 'Present',
    L = 'Late',
    A = 'Absent',
    E = 'Excused Late',
    EA = 'Excused Absent',
    SC = 'School Closure',
    H = 'Holiday',
}

export class Attendance {
    date: string;
    record: string;
    period: AttendancePeriod;

    constructor (
        date: string,
        record: string,
        period: AttendancePeriod,
    ) {
        this.date = date;
        this.record = record;
        this.period = period;
    }
}

export class AttendanceDataDto {
    records: {
        P: Attendance[];
        L: Attendance[];
        A: Attendance[];
        E: Attendance[];
        EA: Attendance[];
        SC: Attendance[];
        H: Attendance[];
    };
    totalRecords: number;

    constructor () {
        this.records = {
            P: [],
            L: [],
            A: [],
            E: [],
            EA: [],
            SC: [],
            H: [],
        };
        this.totalRecords = 0;
    }
}