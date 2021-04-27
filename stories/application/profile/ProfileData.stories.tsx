import { Meta, Story } from '@storybook/react';
import React from 'react';
import ProfileData, { ProfileDataProps } from '../../../components/profile/ProfileData';
import { Homework } from '../../../interfaces/homework';

const HOMEWORK_DATA = [
    new Homework('Git and stuff', 'w01d1', '1 Mar', 'Y'),
    new Homework('JS and stuff', 'w01d2', '1 Apr', 'N'),
    new Homework('Some undefined stuff', 'w01d3', '1 November'),
    new Homework('Git and stuff', 'w01d1', '1 Mar', 'Y'),
    new Homework('JS and stuff', 'w01d2', '1 Apr', 'N'),
    new Homework('Some undefined stuff', 'w01d3', '1 November'),
    new Homework('Git and stuff', 'w01d1', '1 Mar', 'Y'),
    new Homework('JS and stuff', 'w01d2', '1 Apr', 'N'),
    new Homework('Some undefined stuff', 'w01d3', '1 November'),
    new Homework('Git and stuff', 'w01d1', '1 Mar', 'Y'),
    new Homework('JS and stuff', 'w01d2', '1 Apr', 'N'),
    new Homework('Some undefined stuff', 'w01d3', '1 November'),
    new Homework('Git and stuff', 'w01d1', '1 Mar', 'Y'),
    new Homework('JS and stuff', 'w01d2', '1 Apr', 'N'),
    new Homework('Some undefined stuff', 'w01d3', '1 November'),
    new Homework('Git and stuff', 'w01d1', '1 Mar', 'Y'),
    new Homework('JS and stuff', 'w01d2', '1 Apr', 'N'),
    new Homework('Some undefined stuff', 'w01d3', '1 November'),
    new Homework('Git and stuff', 'w01d1', '1 Mar', 'Y'),
    new Homework('JS and stuff', 'w01d2', '1 Apr', 'N'),
    new Homework('Some undefined stuff', 'w01d3', '1 November'),
    new Homework('Git and stuff', 'w01d1', '1 Mar', 'Y'),
    new Homework('JS and stuff', 'w01d2', '1 Apr', 'N'),
    new Homework('Some undefined stuff', 'w01d3', '1 November'),
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

export const Default = Template.bind({});
Default.args = {
    isHomeworkLoading: false,
    homeworkData: {
        isLoading: false,
        submissions: HOMEWORK_DATA,
        completionPercentage: 1/3 * 100,
    }
} as ProfileDataProps;