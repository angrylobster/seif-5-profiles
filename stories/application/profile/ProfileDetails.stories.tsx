import React from 'react';
import { Meta, Story } from "@storybook/react";
import ProfileDetails, { ProfileDetailsProps } from '../../../components/profile/ProfileDetails';

export default {
    title: 'Components/Application/Profile/ProfileDetails',
    component: ProfileDetails,
    argTypes: {
    },
} as Meta;

const Template: Story<any> = args => <ProfileDetails {...args} />;

export const Default = Template.bind({});
Default.args = undefined;

export const WithUser = Template.bind({});
WithUser.args = {
    firstName: 'Serati',
    lastName: 'Ma',
    email: 'johndoe@email.com',
    enrollmentDate: '5-Mar-21',
    githubHandle: 'bananaMonster',
    readinessAssessment: 19,
} as ProfileDetailsProps;