import React, { useState } from 'react';
import { Card } from 'antd';
import { ReactElement } from 'react';
import HomeworkTable, { HomeworkTableProps } from '../homework/HomeworkTable';

const TAB_LIST = [
    {
        key: 'homework',
        tab: 'Homework',
    },
    {
        key: 'attendance',
        tab: 'Attendance',
        disabled: true,
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
        default:
            return <></>;
    }
}

export type ProfileDataProps = {
    homeworkData: HomeworkTableProps;
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