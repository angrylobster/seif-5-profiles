import React, { useState } from 'react';
import { Card } from 'antd';
import { ReactElement } from 'react';
import HomeworkTable, { HomeworkTableProps } from '../homework/HomeworkTable';
import AttendanceData, { AttendanceDataProps } from '../attendance/AttendanceData';

const TAB_LIST = [
    {
        key: 'homework',
        tab: 'Homework',
    },
    {
        key: 'attendance',
        tab: 'Attendance',
    }
];

type ProfileDataContentProps = {
    profileData: ProfileDataProps;
    activeTab: string;
}

function ProfileDataContent (props: ProfileDataContentProps): ReactElement {
    switch (props.activeTab) {
        case 'homework': 
            return (
                <HomeworkTable 
                    submissions={props.profileData.homeworkData.submissions}
                    completionPercentage={props.profileData.homeworkData.completionPercentage}
                    isLoading={props.profileData.homeworkData.isLoading}
                />
            );
        case 'attendance':
            return (
                <AttendanceData 
                    records={props.profileData.attendanceData.records}
                    totalRecords={props.profileData.attendanceData.totalRecords}
                    isLoading={props.profileData.attendanceData.isLoading}
                />
            );
        default:
            return <></>;
    }
}

export type ProfileDataProps = {
    homeworkData: HomeworkTableProps;
    attendanceData: AttendanceDataProps & { isLoading: boolean };
};

export default function ProfileData (props: ProfileDataProps): ReactElement {
    const [activeTab, setActiveTab] = useState(TAB_LIST[0].key);
    return (
        <Card
            tabList={TAB_LIST}
            tabProps={{ size: 'small' }}
            headStyle={{ borderBottom: '0px', paddingTop: '12px' }}
            onTabChange={key => setActiveTab(key)}
        >
            <ProfileDataContent 
                activeTab={activeTab}
                profileData={props}
            />
        </Card>
    );
}