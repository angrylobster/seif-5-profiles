import React, { ReactElement } from 'react';
import { Collapse, Space, Tag } from 'antd';
import { Attendance, AttendanceRecordEnum } from '../../interfaces/attendance';
import moment from 'moment';

type PanelHeaderProps = { 
    title: string;
    percentage: number;
}

function PanelHeader (props: PanelHeaderProps): ReactElement {
    return <span>{props.title}{props.title && props.percentage && ' - '}{props.percentage && `${props.percentage}%`}</span>;
}

export type AttendanceTypeDetailsProps = {
    recordType: string;
    records: Attendance[];
    totalRecords: number;
}

function computePercentage (count: number, total: number) {
    return Number((count / total * 100).toFixed(2)) || 0;
}

export default function AttendanceTypeDetails ({ 
    recordType = '',
    records = [], 
    totalRecords = 0,
}: AttendanceTypeDetailsProps): ReactElement {
    return (
        <>
            {!!records.length &&
                <Collapse style={{ marginBottom: '16px' }}>
                    <Collapse.Panel 
                        header={
                            <PanelHeader 
                                title={AttendanceRecordEnum[recordType]}
                                percentage={computePercentage(records.length, totalRecords)} 
                            />
                        }
                        key={recordType}
                    >
                        <Space 
                            size={[8, 8]} 
                            wrap
                        >
                            {records.map((record: Attendance, index: number) => 
                                <Tag key={index}>
                                    {moment(record.date, 'ddd, MM/DD/YY').format('D MMM YYYY')} ({record.period})
                                </Tag>
                            )}
                        </Space>
                    </Collapse.Panel>
                </Collapse>
            }
        </>
    );
}