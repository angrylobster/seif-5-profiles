import { Meta, Story } from '@storybook/react';
import React from 'react';
import ProfileData, { ProfileDataProps } from '../../../components/profile/ProfileData';
import { Attendance, AttendancePeriod } from '../../../interfaces/attendance';
import { Homework } from '../../../interfaces/homework';

const HOMEWORK_DATA = [
    new Homework('Git and stuff', 'w01d1', '1 Mar', 'Y'),
    new Homework('JS and stuff', 'w01d2', '1 Apr', 'N'),
    new Homework('Some undefined stuff', 'w01d3', '1 November'),
]
    .map((homework: Homework & { key: string }, index: number) => {
        homework.key = index.toString();
        return homework;
    });

export default {
    title: 'Components/Application/Profile/ProfileData',
    component: ProfileData,
} as Meta;

const Template: Story<ProfileDataProps> = args => <ProfileData {...args} />;

export const WithData = Template.bind({});
WithData.args = {
    isHomeworkLoading: false,
    homeworkData: {
        isLoading: false,
        submissions: HOMEWORK_DATA,
        completionPercentage: 1/3 * 100,
    },
    attendanceData: {
        records: {
            P: [
                {
                    'date': 'Sat, 04/17/21',
                    'record': 'P',
                    'period': 'AM'
                },
                {
                    'date': 'Sat, 04/17/21',
                    'record': 'P',
                    'period': 'PM'
                },
                {
                    'date': 'Tue, 04/20/21',
                    'record': 'P',
                    'period': 'PM'
                },
            ],
            L: [
                {
                    'date': 'Sat, 04/24/21',
                    'record': 'P',
                    'period': 'AM'
                },
                {
                    'date': 'Sat, 04/24/21',
                    'record': 'P',
                    'period': 'PM'
                },
            ],
            A: [],
            E: [],
            EA: [],
            SC: [],
            H: [],
        },
        totalRecords: 5,
    }
} as ProfileDataProps;