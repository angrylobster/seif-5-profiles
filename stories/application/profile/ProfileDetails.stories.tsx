import React from 'react';
import { Meta, Story } from '@storybook/react';
import ProfileDetails, { ProfileDetailsProps } from '../../../components/profile/ProfileDetails';

export default {
    title: 'Components/Application/Profile/ProfileDetails',
    component: ProfileDetails,
    argTypes: {
    },
} as Meta;

const Template: Story<ProfileDetailsProps> = args => <ProfileDetails {...args} />;

export const Default = Template.bind({});
Default.args = undefined;

export const WithUser = Template.bind({});
WithUser.args = {
    user: {
        name: {
            first: 'Serati',
            last: 'Ma',
        },
        email: 'johndoe@email.com',
        enrollmentDate: '5-Mar-21',
        githubHandle: 'bananaMonster',
        readinessAssessment: 19,
    }
} as ProfileDetailsProps;