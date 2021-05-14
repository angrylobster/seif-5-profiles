import { Skeleton } from 'antd';
import React, { ReactElement } from 'react';
import { Attendance, AttendanceRecordEnum } from '../../interfaces/attendance';
import AttendanceTypeDetails from './AttendanceTypeDetails';

export type AttendanceDataProps = {
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
    isLoading: boolean;
}

export default function AttendanceData (props: AttendanceDataProps): ReactElement {
    return (
        <>
            {props.totalRecords
                ? Object.keys(props.records)
                    .map((attendanceType: string, index: number) => {
                        return (
                            <AttendanceTypeDetails 
                                key={index}
                                recordType={attendanceType as AttendanceRecordEnum}
                                records={props.records[attendanceType]}
                                totalRecords={props.totalRecords}
                            />
                        );
                    })
                : <Skeleton active />
            }
        </>
    );
}