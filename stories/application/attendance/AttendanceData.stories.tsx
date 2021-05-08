import AttendanceData, { AttendanceDataProps } from '../../../components/attendance/AttendanceData';
import React from 'react';
import { Meta, Story } from '@storybook/react';

export default {
    title: 'Components/Application/Attendance/AttendanceData',
    component: AttendanceData,
    argTypes: {},
} as Meta;

const Template: Story<AttendanceDataProps> = args => <AttendanceData {...args} />;

export const Default = Template.bind({});
Default.args = {
    records: {
        P: [],
        L: [],
        A: [],
        E: [],
        EA: [],
        SC: [],
        H: [],
    },
    totalRecords: 0,
} as AttendanceDataProps;

export const WithPresentAndHoliday = Template.bind({});
WithPresentAndHoliday.args = {
    records: {
        P: [
            {
                'date': 'Sat, 03/13/21',
                'record': 'P',
                'period': 'AM'
            },
            {
                'date': 'Sat, 04/10/21',
                'record': 'P',
                'period': 'AM'
            },
            {
                'date': 'Sat, 04/10/21',
                'record': 'P',
                'period': 'PM'
            },
        ],
        H: [
            {
                'date': 'Sat, 05/01/21',
                'record': 'H',
                'period': 'AM'
            },
            {
                'date': 'Sat, 05/01/21',
                'record': 'H',
                'period': 'PM'
            },
        ],
    },
    totalRecords: 5,
} as AttendanceDataProps;