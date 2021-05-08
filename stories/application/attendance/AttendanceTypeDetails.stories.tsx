import React from 'react';
import { Meta, Story } from '@storybook/react';
import AttendanceTypeDetails, { AttendanceTypeDetailsProps } from '../../../components/attendance/AttendanceTypeDetails';
import { AttendanceRecordEnum } from '../../../interfaces/attendance';

export default {
    title: 'Components/Application/Attendance/AttendanceTypeDetails',
    component: AttendanceTypeDetails,
    argTypes: {},
} as Meta;

const Template: Story<AttendanceTypeDetailsProps> = args => <AttendanceTypeDetails {...args} />;

export const Default = Template.bind({});
Default.args = { 
    records: [],
    totalRecords: 0,
} as AttendanceTypeDetailsProps;

export const ForPresentRecords = Template.bind({});
ForPresentRecords.args = {
    recordType: 'P',
    records: [
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
        {
            'date': 'Tue, 04/13/21',
            'record': 'P',
            'period': 'PM'
        },
        {
            'date': 'Thu, 04/15/21',
            'record': 'P',
            'period': 'PM'
        },
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
        {
            'date': 'Thu, 04/22/21',
            'record': 'P',
            'period': 'PM'
        },
        {
            'date': 'Sat, 04/24/21',
            'record': 'P',
            'period': 'AM'
        },
        {
            'date': 'Sat, 04/24/21',
            'record': 'P',
            'period': 'PM'
        }
    ],
    totalRecords: 20,
} as AttendanceTypeDetailsProps;